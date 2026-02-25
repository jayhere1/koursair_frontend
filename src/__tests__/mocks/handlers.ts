import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:3000';

// ---- Auth handlers ----

export const loginHandler = (
  status = 200,
  body: Record<string, unknown> = { token: 'test-token', refreshToken: 'test-refresh' }
) =>
  http.post('/api/auth/login', () => HttpResponse.json(body, { status }));

export const detailsHandler = (
  status = 200,
  body: Record<string, unknown> = {
    user: { id: '1', name: 'Test User', email: 'test@test.com', phone: '+1234567890' },
  }
) =>
  http.get('/api/auth/details', () => HttpResponse.json(body, { status }));

export const signupHandler = (
  status = 200,
  body: Record<string, unknown> = { token: 'signup-token' }
) =>
  http.post('/api/auth/signup', () => HttpResponse.json(body, { status }));

export const forgotPasswordHandler = (status = 200) =>
  http.post('/api/auth/forgot-password', () =>
    HttpResponse.json({ message: 'Reset link sent' }, { status })
  );

export const requestOtpHandler = (status = 200) =>
  http.post('/api/auth/request-otp', () =>
    HttpResponse.json({ message: 'OTP sent' }, { status })
  );

export const otpLoginHandler = (
  status = 200,
  body: Record<string, unknown> = { token: 'otp-token' }
) =>
  http.post('/api/auth/otp-login', () => HttpResponse.json(body, { status }));

export const resetPasswordHandler = (status = 200) =>
  http.post('/api/auth/reset-password', () =>
    HttpResponse.json({ message: 'Password reset' }, { status })
  );

export const countryCodeHandler = (
  status = 200,
  body: Record<string, unknown> = { calling_code: '+44' }
) =>
  http.get('/api/auth/country-code', () => HttpResponse.json(body, { status }));

export const socialLoginHandler = (status = 200) =>
  http.post('/api/auth/social-login', () =>
    HttpResponse.json({ data: { access_token: 'social-token' } }, { status })
  );

// ---- Backend handlers ----

export const getUserBookingsHandler = (
  status = 200,
  body: Record<string, unknown> = {
    success: true,
    data: {
      page: 1,
      page_size: 10,
      total_count: 1,
      total_records: 1,
      total_pages: 1,
      bookings: [
        {
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
          payment_status: { code: 1, label: 'CONFIRMED' },
          trip_status: { code: 1, label: 'CONFIRMED' },
        },
      ],
    },
  }
) =>
  http.get(`${BASE}/bookings/me`, () => HttpResponse.json(body, { status }));

export const cancelBookingHandler = (
  status = 200,
  body: Record<string, unknown> = {
    success: true,
    code: 200,
    message: 'Cancelled',
    data: { booking_id: 1, status: { code: 3, label: 'CANCELLED' }, reason: 'test', remarks: '', cancellation_date: '2025-01-01' },
  }
) =>
  http.put(`${BASE}/bookings/cancel/:id`, () => HttpResponse.json(body, { status }));

export const createPaypalOrderHandler = (
  status = 200,
  body: Record<string, unknown> = {
    data: { approval_url: 'https://paypal.com/approve' },
  }
) =>
  http.post(`${BASE}/payments/p1/order`, () => HttpResponse.json(body, { status }));

export const capturePaypalOrderHandler = (
  status = 200,
  body: Record<string, unknown> = { success: true, message: 'Captured' }
) =>
  http.post(`${BASE}/payments/capture/p1/payment`, () =>
    HttpResponse.json(body, { status })
  );

export const createKenyaBookingHandler = (
  status = 200,
  body: Record<string, unknown> = {
    success: true,
    code: 200,
    message: 'Booking created',
    data: { payment_id: 'p1' },
  }
) =>
  http.post(`${BASE}/users/travel/booking`, () => HttpResponse.json(body, { status }));

export const uploadFileHandler = (
  status = 200,
  body: Record<string, unknown> = { success: true, data: { url: 'https://s3.example.com/passport.jpg' } }
) =>
  http.post(`${BASE}/api/upload/file`, () => HttpResponse.json(body, { status }));

export const createEnrollmentHandler = (
  status = 200,
  body: Record<string, unknown> = { success: true, data: {} }
) =>
  http.post(`${BASE}/users/enrollment-payment-summary`, () =>
    HttpResponse.json(body, { status })
  );

export const createTahitiBookingHandler = (
  status = 200,
  body: Record<string, unknown> = {
    success: true,
    code: 200,
    message: 'Booked',
    data: { payment_id: 123, total_payable_amount: 2499, currency: 'USD' },
  }
) =>
  http.post(`${BASE}/users/tahiti/booking`, () => HttpResponse.json(body, { status }));

export const createSupportIssueHandler = (
  status = 200,
  body: Record<string, unknown> = { success: true, code: 200, message: 'Created', data: { issue_id: 1 } }
) =>
  http.post(`${BASE}/api/support/issue`, () => HttpResponse.json(body, { status }));
