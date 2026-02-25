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

import { getUserBookings, cancelBooking } from '@/services/bookingsApi';
import { useAuthStore } from '@/stores/authStore';
import { server } from '../mocks/server';
import { getUserBookingsHandler, cancelBookingHandler } from '../mocks/handlers';
import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:3000';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('bookingsApi', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: 'test-token' });
    localStorage.setItem('token', 'test-token');
  });

  describe('getUserBookings', () => {
    it('success → returns paginated data', async () => {
      server.use(getUserBookingsHandler());
      const result = await getUserBookings('upcoming', 1, 10);
      expect(result.bookings).toHaveLength(1);
      expect(result.page).toBe(1);
    });

    it('no token → throws 401', async () => {
      useAuthStore.setState({ token: null });
      localStorage.removeItem('token');
      await expect(getUserBookings('upcoming')).rejects.toEqual(
        expect.objectContaining({ status: 401 })
      );
    });

    it('API 401 → throws', async () => {
      server.use(getUserBookingsHandler(401, { success: false, message: 'Unauthorized' }));
      await expect(getUserBookings('upcoming')).rejects.toEqual(
        expect.objectContaining({ status: 401 })
      );
    });

    it('success: false → throws', async () => {
      server.use(getUserBookingsHandler(200, { success: false, message: 'Nope' }));
      await expect(getUserBookings('upcoming')).rejects.toEqual(
        expect.objectContaining({ message: 'Nope' })
      );
    });

    it('pagination params in URL', async () => {
      let capturedUrl = '';
      server.use(
        http.get(`${BASE}/bookings/me`, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json({
            success: true,
            data: { page: 2, page_size: 5, total_count: 10, total_records: 10, total_pages: 2, bookings: [] },
          });
        })
      );
      await getUserBookings('completed', 2, 5);
      expect(capturedUrl).toContain('page=2');
      expect(capturedUrl).toContain('page_size=5');
      expect(capturedUrl).toContain('status=completed');
    });

    it('abort signal → throws AbortError', async () => {
      server.use(getUserBookingsHandler());
      const controller = new AbortController();
      controller.abort();
      await expect(getUserBookings('upcoming', 1, 10, controller.signal)).rejects.toThrow();
    });
  });

  describe('cancelBooking', () => {
    it('success → message is CANCEL_SUCCESS', async () => {
      server.use(cancelBookingHandler());
      const result = await cancelBooking('b1', { reason: 'test' });
      expect(result.message).toBe('Booking cancelled successfully.');
    });

    it('401 → throws UNAUTHORIZED', async () => {
      server.use(cancelBookingHandler(401, { message: 'Unauthorized' }));
      await expect(cancelBooking('b1', { reason: 'test' })).rejects.toThrow(
        'Session expired. Please login again.'
      );
    });

    it('error with API message → throws that message', async () => {
      server.use(cancelBookingHandler(400, { success: false, message: 'Custom error msg' }));
      await expect(cancelBooking('b1', { reason: 'test' })).rejects.toThrow('Custom error msg');
    });

    it('non-JSON response → throws generic', async () => {
      server.use(
        http.put(`${BASE}/bookings/cancel/:id`, () =>
          new HttpResponse('Not JSON', { status: 500, headers: { 'Content-Type': 'text/plain' } })
        )
      );
      await expect(cancelBooking('b1', { reason: 'test' })).rejects.toThrow();
    });
  });
});
