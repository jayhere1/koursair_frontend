import { vi } from 'vitest';

export const mockNextImage = () => {
  vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: Record<string, unknown>) => {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      const { fill, priority, ...rest } = props;
      return <img {...rest} />;
    },
  }));
};

export const mockNextDynamic = () => {
  vi.mock('next/dynamic', () => ({
    __esModule: true,
    default: (loader: () => Promise<{ default: React.ComponentType }>) => {
      // Immediately resolve the component for testing
      let Component: React.ComponentType | null = null;
      const promise = loader();
      promise.then((mod) => {
        Component = mod.default;
      });
      return (props: Record<string, unknown>) =>
        Component ? <Component {...props} /> : null;
    },
  }));
};

export const mockSupabase = () => {
  vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        signInWithOAuth: vi.fn(),
        signOut: vi.fn(),
      },
    },
  }));
};

export const mockSonner = () => {
  vi.mock('sonner', () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn(),
    },
  }));
};
