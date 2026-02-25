import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';

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

import { createUserBooking, uploadFile, createEnrollment } from '@/services/kenyaApi';
import { server } from '../mocks/server';
import { createKenyaBookingHandler, uploadFileHandler, createEnrollmentHandler } from '../mocks/handlers';
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
    family_pack: false,
  },
  is_normal: false,
  payment_plan: { id: 123 },
});

describe('kenyaApi', () => {
  describe('createUserBooking', () => {
    it('success', async () => {
      server.use(createKenyaBookingHandler());
      const result = await createUserBooking(makePayload() as never, 'tok');
      expect(result.success).toBe(true);
    });

    it('API error → returns { success: false }', async () => {
      server.use(createKenyaBookingHandler(400, { message: 'Bad request' }));
      const result = await createUserBooking(makePayload() as never, 'tok');
      expect(result.success).toBe(false);
    });

    it('network error → returns { success: false }', async () => {
      server.use(
        http.post(`${BASE}/users/travel/booking`, () => HttpResponse.error())
      );
      const result = await createUserBooking(makePayload() as never, 'tok');
      expect(result.success).toBe(false);
      expect(result.message).toContain('Unable to connect');
    });
  });

  describe('uploadFile', () => {
    it('success with data.url', async () => {
      server.use(uploadFileHandler());
      const file = new File(['test'], 'passport.jpg', { type: 'image/jpeg' });
      const url = await uploadFile(file, 'tok');
      expect(url).toBe('https://s3.example.com/passport.jpg');
    });

    it('success with data as string', async () => {
      server.use(
        http.post(`${BASE}/api/upload/file`, () =>
          HttpResponse.json({ success: true, data: 'https://s3.example.com/direct.jpg' })
        )
      );
      const file = new File(['test'], 'passport.jpg', { type: 'image/jpeg' });
      const url = await uploadFile(file, 'tok');
      expect(url).toBe('https://s3.example.com/direct.jpg');
    });

    it('failure → throws', async () => {
      server.use(uploadFileHandler(400, { success: false, message: 'Upload failed' }));
      const file = new File(['test'], 'passport.jpg', { type: 'image/jpeg' });
      await expect(uploadFile(file, 'tok')).rejects.toThrow('Upload failed');
    });
  });

  describe('createEnrollment', () => {
    it('success', async () => {
      server.use(createEnrollmentHandler());
      const result = await createEnrollment({ adults: 2, children: 1 }, 'tok');
      expect(result.success).toBe(true);
    });

    it('failure → throws', async () => {
      server.use(createEnrollmentHandler(500));
      await expect(createEnrollment({ adults: 1, children: 0 }, 'tok')).rejects.toThrow();
    });
  });
});
