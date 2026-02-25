import { create } from 'zustand';
import { Booking } from '@/types/bookings';
import { cancelBooking, getUserBookings } from '@/services/bookingsApi';
import { createPaypalOrder } from '@/services/paypalApi';
import { toast } from 'sonner';

interface BookingsPageState {
  activeTab: 'upcoming' | 'completed' | 'cancelled';
  bookings: Booking[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalPages: number;

  showCancelModal: boolean;
  selectedBookingId: string | null;
  cancelReason: string;
  cancelRemarks: string;
  cancelLoading: boolean;
  payLoading: string | null;
  showOtherTooltip: boolean;

  // Actions
  setActiveTab: (tab: 'upcoming' | 'completed' | 'cancelled') => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setShowOtherTooltip: (v: boolean) => void;

  openCancelModal: (bookingId: string) => void;
  closeCancelModal: () => void;
  setCancelReason: (reason: string) => void;
  setCancelRemarks: (remarks: string) => void;

  fetchBookings: (signal?: AbortSignal) => Promise<void>;
  handleCancelBooking: () => Promise<void>;
  handlePayNow: (booking: Booking) => Promise<void>;
}

export const useBookingsPageStore = create<BookingsPageState>()((set, get) => ({
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

  setActiveTab: (tab) => set({ activeTab: tab, page: 1 }),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size, page: 1 }),
  setShowOtherTooltip: (v) => set({ showOtherTooltip: v }),

  openCancelModal: (bookingId) => set({ showCancelModal: true, selectedBookingId: bookingId }),
  closeCancelModal: () => set({ showCancelModal: false, cancelReason: '', cancelRemarks: '', selectedBookingId: null }),
  setCancelReason: (reason) => set({ cancelReason: reason }),
  setCancelRemarks: (remarks) => set({ cancelRemarks: remarks }),

  fetchBookings: async (signal?) => {
    const { activeTab, page, pageSize } = get();
    set({ loading: true });
    try {
      const result = await getUserBookings(activeTab, page, pageSize, signal);
      set({ bookings: result.bookings, totalPages: Number(result.total_pages) || 1 });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      toast.error(err instanceof Error ? err.message : 'Server is currently unavailable.');
      set({ bookings: [], totalPages: 1 });
    } finally {
      set({ loading: false });
    }
  },

  handleCancelBooking: async () => {
    const { cancelReason, cancelRemarks, selectedBookingId, activeTab, page, pageSize } = get();

    if (!cancelReason) {
      toast.error('Please select a reason for cancellation.');
      return;
    }
    if (cancelReason === 'Others' && !cancelRemarks.trim()) {
      toast.error('Please type your reason in the "Other" field.');
      return;
    }
    if (!selectedBookingId) {
      toast.error('No booking selected for cancellation.');
      return;
    }

    set({ cancelLoading: true });
    try {
      await cancelBooking(selectedBookingId, { reason: cancelReason, remarks: cancelRemarks || '' });
      toast.success('Booking cancelled successfully.');
      set({ showCancelModal: false, cancelReason: '', cancelRemarks: '', selectedBookingId: null });

      try {
        const updated = await getUserBookings(activeTab, page, pageSize);
        set({ bookings: updated.bookings || [], totalPages: updated.total_pages || 1 });
      } catch {
        set({ bookings: [], totalPages: 1 });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to cancel booking.');
      } else {
        toast.error('Unknown error occurred');
      }
    } finally {
      set({ cancelLoading: false });
    }
  },

  handlePayNow: async (booking) => {
    set({ payLoading: booking.id });
    try {
      const orderPayload = {
        payment_id: booking.payment_id,
        amount: Number(booking.remaining_amount),
        currency: booking.currency,
        destination: booking.trip_name,
      };
      const orderRes = await createPaypalOrder(orderPayload);
      if (orderRes.data && orderRes.data.approval_url) {
        window.location.href = orderRes.data.approval_url;
      } else if (orderRes.message) {
        toast.error(orderRes.message);
      } else {
        toast.error('PayPal order failed');
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: string }).message === 'string') {
        toast.error((err as { message: string }).message || 'PayPal order failed');
      } else {
        toast.error('PayPal order failed');
      }
    } finally {
      set({ payLoading: null });
    }
  },
}));
