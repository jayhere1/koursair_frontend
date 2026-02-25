import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach, vi } from 'vitest';

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

import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { server } from '../mocks/server';
import {
  loginHandler,
  detailsHandler,
  signupHandler,
  forgotPasswordHandler,
  requestOtpHandler,
  otpLoginHandler,
  resetPasswordHandler,
  countryCodeHandler,
} from '../mocks/handlers';
import { toast } from 'sonner';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const resetStores = () => {
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
  vi.clearAllMocks();
};

describe('authStore', () => {
  beforeEach(() => {
    resetStores();
  });

  describe('login', () => {
    it('success → user + token set, localStorage populated, modals closed', async () => {
      server.use(loginHandler(), detailsHandler());
      await useAuthStore.getState().login('test@test.com', 'pass');
      expect(useAuthStore.getState().user).toEqual({
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        phone: '+1234567890',
      });
      expect(useAuthStore.getState().token).toBe('test-token');
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
    });

    it('401 failure → state unchanged', async () => {
      server.use(loginHandler(401, { message: 'Invalid credentials' }));
      await useAuthStore.getState().login('test@test.com', 'wrong');
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().token).toBeNull();
      expect(toast.error).toHaveBeenCalled();
    });

    it('500 error → state unchanged', async () => {
      server.use(loginHandler(500, { message: 'Server error' }));
      await useAuthStore.getState().login('test@test.com', 'pass');
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe('signup', () => {
    it('success → user + token set', async () => {
      server.use(signupHandler(), detailsHandler());
      await useAuthStore.getState().signup('Test', 'test@test.com', '+1', '1234567890', 'pass', 'pass');
      expect(useAuthStore.getState().user).toBeTruthy();
      expect(useAuthStore.getState().token).toBe('signup-token');
    });

    it('failure → throws, state unchanged', async () => {
      server.use(signupHandler(400, { message: 'Email taken' }));
      await expect(
        useAuthStore.getState().signup('T', 'test@test.com', '+1', '123', 'p', 'p')
      ).rejects.toThrow();
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe('logout', () => {
    it('clears user, token, localStorage', () => {
      useAuthStore.setState({ user: { id: '1', name: 'A', email: 'a@b.com' }, token: 'tok' });
      localStorage.setItem('token', 'tok');
      useAuthStore.getState().logout();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().token).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('returns true when user is set', () => {
      useAuthStore.setState({ user: { id: '1', name: 'A', email: 'a@b.com' } });
      expect(useAuthStore.getState().isAuthenticated()).toBe(true);
    });

    it('returns false when user is null', () => {
      expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    });
  });

  describe('fetchPhoneCode', () => {
    it('success → detectedPhoneCode set', async () => {
      server.use(countryCodeHandler());
      await useAuthStore.getState().fetchPhoneCode();
      expect(useAuthStore.getState().detectedPhoneCode).toBe('+44');
      expect(useAuthStore.getState().isPhoneCodeLoading).toBe(false);
    });

    it('failure → fallback +91', async () => {
      server.use(countryCodeHandler(500));
      await useAuthStore.getState().fetchPhoneCode();
      expect(useAuthStore.getState().detectedPhoneCode).toBe('+91');
      expect(useAuthStore.getState().isPhoneCodeLoading).toBe(false);
    });
  });

  describe('other auth methods', () => {
    it('forgotPassword success', async () => {
      server.use(forgotPasswordHandler());
      await useAuthStore.getState().forgotPassword('test@test.com');
      expect(toast.success).toHaveBeenCalled();
    });

    it('requestOtp success', async () => {
      server.use(requestOtpHandler());
      await useAuthStore.getState().requestOtp('test@test.com');
      expect(toast.success).toHaveBeenCalled();
    });

    it('signInWithOtp success → user + token set', async () => {
      server.use(otpLoginHandler(), detailsHandler());
      await useAuthStore.getState().signInWithOtp('test@test.com', '123456');
      expect(useAuthStore.getState().user).toBeTruthy();
      expect(useAuthStore.getState().token).toBe('otp-token');
    });

    it('resetPasswordFromLink with no resetToken → error', async () => {
      await expect(
        useAuthStore.getState().resetPasswordFromLink('test@test.com', 'new', 'new')
      ).rejects.toThrow('No reset token found');
      expect(toast.error).toHaveBeenCalled();
    });

    it('resetPasswordFromLink with token, success → resetToken cleared', async () => {
      server.use(resetPasswordHandler(), detailsHandler());
      useAuthStore.setState({ resetToken: 'valid-reset-token' });
      await useAuthStore.getState().resetPasswordFromLink('test@test.com', 'new', 'new');
      expect(useAuthStore.getState().resetToken).toBeNull();
      expect(useUIStore.getState().showLoginModal).toBe(true);
    });
  });
});
