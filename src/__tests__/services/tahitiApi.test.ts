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

import { bookingService } from '@/services/tahitiApi';
import { useAuthStore } from '@/stores/authStore';
import { server } from '../mocks/server';
import { createTahitiBookingHandler } from '../mocks/handlers';
import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:3000';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const makePayload = () => ({
  name: 'Test',
  email: 'test@test.com',
  phone_number: '+1234',
  traveller_details: {
    number_of_adults: 1,
    number_of_children: 0,
    primary_traveller: {
      prefix: 'Mr',
      first_name: 'John',
      middle_name: '',
      last_name: 'Doe',
      gender: 'Male',
      dob: '15-06-1990',
      nationality: 'US',
      passport: '',
    },
    members: [],
  },
  payment_plan: {
    id: 732905418293,
    payment_type: 'Full' as const,
  },
});

describe('tahitiApi', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: 'test-token' });
    localStorage.setItem('token', 'test-token');
  });

  it('createTahitiBooking success', async () => {
    server.use(createTahitiBookingHandler());
    const result = await bookingService.createTahitiBooking(makePayload());
    expect(result.payment_id).toBe(123);
    expect(result.currency).toBe('USD');
  });

  it('API not ok → throws', async () => {
    server.use(createTahitiBookingHandler(500, { success: false, message: 'Server error' }));
    await expect(bookingService.createTahitiBooking(makePayload())).rejects.toThrow('Server error');
  });

  it('success: false → throws', async () => {
    server.use(
      http.post(`${BASE}/users/tahiti/booking`, () =>
        HttpResponse.json({ success: false, code: 200, message: 'Booking validation failed', data: null })
      )
    );
    await expect(bookingService.createTahitiBooking(makePayload())).rejects.toThrow('Booking validation failed');
  });
});
