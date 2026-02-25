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

import { createSupportIssue } from '@/services/supportApi';
import { useAuthStore } from '@/stores/authStore';
import { server } from '../mocks/server';
import { createSupportIssueHandler } from '../mocks/handlers';
import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:3000';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('supportApi', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: 'test-token' });
    localStorage.setItem('token', 'test-token');
  });

  it('success', async () => {
    server.use(createSupportIssueHandler());
    const result = await createSupportIssue({
      subject: 'Help',
      priority: 'High',
      issue_type: 'Bug',
      description: 'Something broke',
    });
    expect(result.success).toBe(true);
    expect(result.data?.issue_id).toBe(1);
  });

  it('failure → throws', async () => {
    server.use(createSupportIssueHandler(400, { message: 'Bad request', success: false, code: 400, data: null }));
    await expect(
      createSupportIssue({
        subject: 'Help',
        priority: 'High',
        issue_type: 'Bug',
        description: 'Something broke',
      })
    ).rejects.toThrow('Bad request');
  });

  it('with file attachment → FormData includes file', async () => {
    let hasFile = false;
    server.use(
      http.post(`${BASE}/api/support/issue`, async ({ request }) => {
        const body = await request.formData();
        hasFile = body.has('file');
        return HttpResponse.json({ success: true, code: 200, message: 'Created', data: { issue_id: 2 } });
      })
    );
    const file = new File(['content'], 'screenshot.png', { type: 'image/png' });
    await createSupportIssue({
      subject: 'Help',
      priority: 'High',
      issue_type: 'Bug',
      description: 'Broke',
      file,
    });
    expect(hasFile).toBe(true);
  });

  it('without file → FormData excludes file', async () => {
    let hasFile = true;
    server.use(
      http.post(`${BASE}/api/support/issue`, async ({ request }) => {
        const body = await request.formData();
        hasFile = body.has('file');
        return HttpResponse.json({ success: true, code: 200, message: 'Created', data: { issue_id: 3 } });
      })
    );
    await createSupportIssue({
      subject: 'Help',
      priority: 'High',
      issue_type: 'Bug',
      description: 'Broke',
    });
    expect(hasFile).toBe(false);
  });
});
