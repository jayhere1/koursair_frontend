import { vi } from 'vitest';

export const mockRouter = {
  replace: vi.fn(),
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

let currentPathname = '/';

export const setMockPathname = (path: string) => {
  currentPathname = path;
};

export const getMockPathname = () => currentPathname;

export const mockNextNavigation = () => {
  vi.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
    usePathname: () => currentPathname,
    useSearchParams: () => new URLSearchParams(),
  }));
};
