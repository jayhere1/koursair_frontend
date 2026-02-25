import { describe, it, expect, beforeEach, vi } from 'vitest';

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

import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';

const makeValidToken = () => {
  const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
  return 'h.' + btoa(JSON.stringify(payload)) + '.s';
};

const makeExpiredToken = () => {
  const payload = { exp: Math.floor(Date.now() / 1000) - 3600 };
  return 'h.' + btoa(JSON.stringify(payload)) + '.s';
};

const resetStores = () => {
  useUIStore.setState({
    showLoginModal: false,
    showSignupModal: false,
    showForgotPasswordModal: false,
    showOTPEmailModal: false,
    showCreateNewPasswordModal: false,
    sessionExpiredOpen: false,
    popupConfig: null,
  });
  useAuthStore.setState({
    user: null,
    token: null,
    resetToken: null,
    authInitialized: false,
    detectedPhoneCode: null,
    isPhoneCodeLoading: true,
  });
  localStorage.clear();
};

describe('uiStore', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('modal management', () => {
    it('openLogin sets only showLoginModal true', () => {
      useUIStore.getState().openLogin();
      const s = useUIStore.getState();
      expect(s.showLoginModal).toBe(true);
      expect(s.showSignupModal).toBe(false);
      expect(s.showForgotPasswordModal).toBe(false);
    });

    it('openSignup sets only showSignupModal true', () => {
      useUIStore.getState().openSignup();
      const s = useUIStore.getState();
      expect(s.showSignupModal).toBe(true);
      expect(s.showLoginModal).toBe(false);
    });

    it('closeModals sets all to false and clears resetToken', () => {
      useAuthStore.setState({ resetToken: 'some-token' });
      useUIStore.getState().openLogin();
      useUIStore.getState().closeModals();
      const s = useUIStore.getState();
      expect(s.showLoginModal).toBe(false);
      expect(useAuthStore.getState().resetToken).toBeNull();
    });

    it('openAuth opens login when no modal open', () => {
      useUIStore.getState().openAuth();
      expect(useUIStore.getState().showLoginModal).toBe(true);
    });

    it('openAuth does nothing when modal already open', () => {
      useUIStore.getState().openSignup();
      useUIStore.getState().openAuth();
      expect(useUIStore.getState().showSignupModal).toBe(true);
      expect(useUIStore.getState().showLoginModal).toBe(false);
    });

    it('openCreateNewPassword opens modal and sets resetToken', () => {
      useUIStore.getState().openCreateNewPassword('reset-tok');
      expect(useUIStore.getState().showCreateNewPasswordModal).toBe(true);
      expect(useAuthStore.getState().resetToken).toBe('reset-tok');
    });
  });

  describe('handleSessionExpired', () => {
    it('returns early if sessionExpiredOpen already true', () => {
      useUIStore.setState({ sessionExpiredOpen: true });
      useAuthStore.setState({ token: makeExpiredToken() });
      localStorage.setItem('token', makeExpiredToken());
      useUIStore.getState().handleSessionExpired('/your_bookings');
      // Should not change login modal state
      expect(useUIStore.getState().showLoginModal).toBe(false);
    });

    it('returns early if a modal is already open', () => {
      useUIStore.setState({ showLoginModal: true });
      useAuthStore.setState({ token: makeExpiredToken() });
      localStorage.setItem('token', makeExpiredToken());
      useUIStore.getState().handleSessionExpired('/your_bookings');
      expect(useUIStore.getState().sessionExpiredOpen).toBe(false);
    });

    it('no token + protected page → opens login', () => {
      useUIStore.getState().handleSessionExpired('/your_bookings');
      expect(useUIStore.getState().showLoginModal).toBe(true);
    });

    it('no token + non-protected page → noop', () => {
      useUIStore.getState().handleSessionExpired('/about');
      expect(useUIStore.getState().showLoginModal).toBe(false);
    });

    it('valid token → noop', () => {
      const token = makeValidToken();
      useAuthStore.setState({ token });
      localStorage.setItem('token', token);
      useUIStore.getState().handleSessionExpired('/your_bookings');
      expect(useUIStore.getState().sessionExpiredOpen).toBe(false);
    });

    it('expired token + protected page → clears auth, sets sessionExpiredOpen', () => {
      const token = makeExpiredToken();
      useAuthStore.setState({ token, user: { id: '1', name: 'A', email: 'a@b.com' } });
      localStorage.setItem('token', token);
      useUIStore.getState().handleSessionExpired('/booking/kenya');
      expect(useUIStore.getState().sessionExpiredOpen).toBe(true);
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().user).toBeNull();
    });

    it('expired token + non-protected page → clears auth, no sessionExpiredOpen', () => {
      const token = makeExpiredToken();
      useAuthStore.setState({ token, user: { id: '1', name: 'A', email: 'a@b.com' } });
      localStorage.setItem('token', token);
      useUIStore.getState().handleSessionExpired('/about');
      expect(useUIStore.getState().sessionExpiredOpen).toBe(false);
      expect(useAuthStore.getState().token).toBeNull();
    });

    it('detects protected pages correctly', () => {
      const protectedPaths = ['/your_bookings', '/tour/Kenya', '/booking'];
      const nonProtectedPaths = ['/about', '/', '/reviews'];

      // Check that /your_bookings triggers login with no token
      for (const p of protectedPaths) {
        resetStores();
        useUIStore.getState().handleSessionExpired(p);
        expect(useUIStore.getState().showLoginModal).toBe(true);
      }

      for (const p of nonProtectedPaths) {
        resetStores();
        useUIStore.getState().handleSessionExpired(p);
        expect(useUIStore.getState().showLoginModal).toBe(false);
      }
    });
  });
});
