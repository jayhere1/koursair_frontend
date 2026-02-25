import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach, vi } from 'vitest';

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

import { useBookingsPageStore } from '@/stores/bookingsPageStore';
import { useAuthStore } from '@/stores/authStore';
import { server } from '../mocks/server';
import {
  getUserBookingsHandler,
  cancelBookingHandler,
  createPaypalOrderHandler,
} from '../mocks/handlers';
import { toast } from 'sonner';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const resetStore = () => {
  useBookingsPageStore.setState({
    activeTab: 'upcoming',
    bookings: [],
    loading: false,
    page: 1,
    pageSize: 10,
    totalPages: 1,
    showCancelModal: false,
    selectedBookingId: null,
    cancelReason: '',
    cancelRemarks: '',
    cancelLoading: false,
    payLoading: null,
    showOtherTooltip: false,
  });
  useAuthStore.setState({ user: null, token: 'test-token' });
  localStorage.setItem('token', 'test-token');
  vi.clearAllMocks();
};

describe('bookingsPageStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('setActiveTab changes tab and resets page', () => {
    useBookingsPageStore.setState({ page: 3 });
    useBookingsPageStore.getState().setActiveTab('completed');
    expect(useBookingsPageStore.getState().activeTab).toBe('completed');
    expect(useBookingsPageStore.getState().page).toBe(1);
  });

  describe('fetchBookings', () => {
    it('success → bookings populated', async () => {
      server.use(getUserBookingsHandler());
      await useBookingsPageStore.getState().fetchBookings();
      expect(useBookingsPageStore.getState().bookings).toHaveLength(1);
      expect(useBookingsPageStore.getState().bookings[0].id).toBe('b1');
    });

    it('failure → empty bookings, toast error', async () => {
      server.use(getUserBookingsHandler(500, { success: false, message: 'Server error' }));
      await useBookingsPageStore.getState().fetchBookings();
      expect(useBookingsPageStore.getState().bookings).toHaveLength(0);
      expect(toast.error).toHaveBeenCalled();
    });

    it('aborted signal → no error toast', async () => {
      server.use(getUserBookingsHandler());
      const controller = new AbortController();
      controller.abort();
      await useBookingsPageStore.getState().fetchBookings(controller.signal);
      // The AbortError should be silently ignored
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  describe('handleCancelBooking', () => {
    it('no reason → toast error', async () => {
      useBookingsPageStore.setState({ selectedBookingId: 'b1', cancelReason: '' });
      await useBookingsPageStore.getState().handleCancelBooking();
      expect(toast.error).toHaveBeenCalledWith('Please select a reason for cancellation.');
    });

    it('reason "Others" with no remarks → toast error', async () => {
      useBookingsPageStore.setState({ selectedBookingId: 'b1', cancelReason: 'Others', cancelRemarks: '' });
      await useBookingsPageStore.getState().handleCancelBooking();
      expect(toast.error).toHaveBeenCalledWith('Please type your reason in the "Other" field.');
    });

    it('no selectedBookingId → toast error', async () => {
      useBookingsPageStore.setState({ cancelReason: 'Changed plans', selectedBookingId: null });
      await useBookingsPageStore.getState().handleCancelBooking();
      expect(toast.error).toHaveBeenCalledWith('No booking selected for cancellation.');
    });

    it('success → modal closed, bookings re-fetched', async () => {
      server.use(cancelBookingHandler(), getUserBookingsHandler());
      useBookingsPageStore.setState({
        selectedBookingId: 'b1',
        cancelReason: 'Changed plans',
        showCancelModal: true,
      });
      await useBookingsPageStore.getState().handleCancelBooking();
      expect(useBookingsPageStore.getState().showCancelModal).toBe(false);
      expect(toast.success).toHaveBeenCalledWith('Booking cancelled successfully.');
    });

    it('failure → toast error', async () => {
      server.use(cancelBookingHandler(500, { success: false, message: 'Failed' }));
      useBookingsPageStore.setState({ selectedBookingId: 'b1', cancelReason: 'Changed plans' });
      await useBookingsPageStore.getState().handleCancelBooking();
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe('handlePayNow', () => {
    it('success → payLoading clears', async () => {
      server.use(createPaypalOrderHandler());
      // Mock window.location.href
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { ...originalLocation, href: '' },
      });

      const booking = {
        id: 'b1',
        booking_id: 'BK001',
        payment_id: 'P1',
        trip_name: 'Kenya',
        package: 'Standard',
        currency: 'USD',
        total_amount: '1000',
        paid_amount: '500',
        remaining_amount: '500',
        discount_applied: '0',
        booking_date: '2025-01-01',
        travellers: {
          number_of_adults: 1,
          number_of_children: 0,
          family_pack: false,
          primary_traveller: { first_name: 'John', last_name: 'Doe' },
          members: [],
        },
        payment_status: { code: 1, label: 'CONFIRMED' as const },
        trip_status: { code: 1, label: 'CONFIRMED' as const },
      };

      await useBookingsPageStore.getState().handlePayNow(booking);
      expect(useBookingsPageStore.getState().payLoading).toBeNull();

      Object.defineProperty(window, 'location', {
        writable: true,
        value: originalLocation,
      });
    });

    it('failure → toast error', async () => {
      server.use(createPaypalOrderHandler(500));

      const booking = {
        id: 'b1',
        booking_id: 'BK001',
        payment_id: 'P1',
        trip_name: 'Kenya',
        package: 'Standard',
        currency: 'USD',
        total_amount: '1000',
        paid_amount: '500',
        remaining_amount: '500',
        discount_applied: '0',
        booking_date: '2025-01-01',
        travellers: {
          number_of_adults: 1,
          number_of_children: 0,
          family_pack: false,
          primary_traveller: { first_name: 'John', last_name: 'Doe' },
          members: [],
        },
        payment_status: { code: 1, label: 'CONFIRMED' as const },
        trip_status: { code: 1, label: 'CONFIRMED' as const },
      };

      await useBookingsPageStore.getState().handlePayNow(booking);
      expect(toast.error).toHaveBeenCalled();
      expect(useBookingsPageStore.getState().payLoading).toBeNull();
    });
  });
});
