import type { Traveller } from "./traveller";

export type Status = {
  code: number;
  label: "CONFIRMED" | "COMPLETED" | "CANCELLED" | string;
};

export type Booking = {
  id: string;
  booking_id: string;
  payment_id: string;
  trip_name: string;
  package: string;
  currency: string;
  total_amount: string;
  paid_amount: string;
  remaining_amount: string;
  discount_applied: string;
  booking_date: string;
  country?: string; 
  travellers: {
    number_of_adults: number;
    number_of_children: number;
    family_pack: boolean;
    primary_traveller: Traveller;
    members: Traveller[];
  };
  payment_status: Status;
  trip_status: Status;
};

export type UserBookingsPaginated = {
  page: number;
  page_size: number;
  total_count: number;
  total_records: number;
  total_pages: number;
  bookings: Booking[];
};


export type CancelBookingPayload = {
  reason: string;
  remarks?: string;
};

export type CancelBookingResponse = {
  booking_id: number;
  status: {
    code: number;
    label: "CANCELLED";
  };
  reason: string;
  remarks: string;
  cancellation_date: string;
};
