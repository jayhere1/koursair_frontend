import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Set env vars for tests
process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

afterEach(() => {
  cleanup();
  localStorage.clear();
});
