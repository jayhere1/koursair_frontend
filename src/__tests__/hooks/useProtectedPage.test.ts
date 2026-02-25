import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const mockReplace = vi.fn();
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush, back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/your_bookings',
}));

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

import { useProtectedPage } from '@/hooks/useProtectedPage';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

const makeValidToken = () => {
  const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
  return 'h.' + btoa(JSON.stringify(payload)) + '.s';
};

const makeExpiredToken = () => {
  const payload = { exp: Math.floor(Date.now() / 1000) - 3600 };
  return 'h.' + btoa(JSON.stringify(payload)) + '.s';
};

describe('useProtectedPage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      authInitialized: false,
      resetToken: null,
      detectedPhoneCode: null,
      isPhoneCodeLoading: true,
    });
    useUIStore.setState({
      showLoginModal: false,
      showSignupModal: false,
      showForgotPasswordModal: false,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: false,
      sessionExpiredOpen: false,
      popupConfig: null,
    });
    localStorage.clear();
    mockReplace.mockClear();
  });

  it('authInitialized false → isReady false, isAuthenticated false', () => {
    const { result } = renderHook(() => useProtectedPage());
    expect(result.current.isReady).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('valid token → isReady true, isAuthenticated true', () => {
    const token = makeValidToken();
    useAuthStore.setState({ token, authInitialized: true, user: { id: '1', name: 'A', email: 'a@b.com' } });
    const { result } = renderHook(() => useProtectedPage());
    expect(result.current.isReady).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('no token on protected page → handleSessionExpired called', () => {
    useAuthStore.setState({ authInitialized: true, token: null });
    renderHook(() => useProtectedPage());
    // handleSessionExpired is triggered, which opens login modal for protected pages
    expect(useUIStore.getState().showLoginModal).toBe(true);
  });

  it('expired token → isSessionInvalid true', () => {
    const token = makeExpiredToken();
    useAuthStore.setState({ token, authInitialized: true });
    const { result } = renderHook(() => useProtectedPage());
    expect(result.current.isSessionInvalid).toBe(true);
  });

  it('user dismisses modal → router.replace("/") called', () => {
    useAuthStore.setState({ authInitialized: true, token: null });

    const { rerender } = renderHook(() => useProtectedPage());

    // Modal was opened by handleSessionExpired. Now simulate closing all modals
    // (user dismissed). The hook should detect isSessionInvalid && !isAuthFlowActive
    // and since authFlowTriggered.current is already true, it calls replace('/')
    act(() => {
      useUIStore.getState().closeModals();
    });
    rerender();

    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  it('auth succeeds mid-flow → isAuthenticated becomes true', () => {
    useAuthStore.setState({ authInitialized: true, token: null });
    const { result, rerender } = renderHook(() => useProtectedPage());

    expect(result.current.isAuthenticated).toBe(false);

    // Simulate successful auth
    act(() => {
      const token = makeValidToken();
      useAuthStore.setState({ token, user: { id: '1', name: 'A', email: 'a@b.com' } });
    });
    rerender();

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isSessionInvalid).toBe(false);
  });
});
