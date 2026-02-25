import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach, vi } from 'vitest';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
  },
}));

import { createPaypalOrder, capturePaypalOrder } from '@/services/paypalApi';
import { useAuthStore } from '@/stores/authStore';
import { server } from '../mocks/server';
import { createPaypalOrderHandler, capturePaypalOrderHandler } from '../mocks/handlers';
import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:3000';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('paypalApi', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: 'test-token' });
    localStorage.setItem('token', 'test-token');
  });

  it('createPaypalOrder success', async () => {
    server.use(createPaypalOrderHandler());
    const result = await createPaypalOrder({ amount: 100, currency: 'USD', destination: 'Kenya' });
    expect(result.data.approval_url).toBe('https://paypal.com/approve');
  });

  it('createPaypalOrder failure → throws', async () => {
    server.use(createPaypalOrderHandler(500));
    await expect(createPaypalOrder({ amount: 100, currency: 'USD', destination: 'Kenya' })).rejects.toThrow(
      'Failed to create PayPal order'
    );
  });

  it('capturePaypalOrder success', async () => {
    server.use(capturePaypalOrderHandler());
    const result = await capturePaypalOrder({ order_id: 'ORDER123' });
    expect(result.success).toBe(true);
  });

  it('capturePaypalOrder failure → throws', async () => {
    server.use(capturePaypalOrderHandler(500));
    await expect(capturePaypalOrder({ order_id: 'ORDER123' })).rejects.toThrow(
      'Failed to capture PayPal order'
    );
  });

  it('auth header present when token exists', async () => {
    let authHeader = '';
    server.use(
      http.post(`${BASE}/payments/p1/order`, ({ request }) => {
        authHeader = request.headers.get('Authorization') || '';
        return HttpResponse.json({ data: { approval_url: 'https://paypal.com' } });
      })
    );
    await createPaypalOrder({ amount: 100, currency: 'USD', destination: 'Kenya' });
    expect(authHeader).toBe('Bearer test-token');
  });
});
