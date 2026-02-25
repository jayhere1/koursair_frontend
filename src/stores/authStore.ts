import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export const isJwtExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

interface AuthState {
  user: User | null;
  token: string | null;
  authInitialized: boolean;
  resetToken: string | null;
  detectedPhoneCode: string | null;
  isPhoneCodeLoading: boolean;

  // Computed
  isAuthenticated: () => boolean;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthInitialized: (v: boolean) => void;
  setResetToken: (token: string | null) => void;
  setDetectedPhoneCode: (code: string | null) => void;
  setIsPhoneCodeLoading: (v: boolean) => void;

  // Auth API methods
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, country_code: string, mobile: string, password: string, confirm_password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  signInWithOtp: (email: string, otp: string) => Promise<void>;
  resetPasswordFromLink: (email: string, newPass: string, confirmPass: string) => Promise<void>;
  logout: () => void;
  handleOAuthCallback: (router?: { replace: (url: string) => void }) => Promise<void>;
  fetchPhoneCode: () => Promise<void>;
}

const handleAuthSuccess = async (token: string, refreshToken?: string): Promise<User> => {
  if (!token) throw new Error('No token provided');

  localStorage.setItem('token', token);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

  const response = await fetch('/api/auth/details', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch user details');

  const user = data.user;
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      authInitialized: false,
      resetToken: null,
      detectedPhoneCode: null,
      isPhoneCodeLoading: true,

      isAuthenticated: () => !!get().user,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuthInitialized: (v) => set({ authInitialized: v }),
      setResetToken: (token) => set({ resetToken: token }),
      setDetectedPhoneCode: (code) => set({ detectedPhoneCode: code }),
      setIsPhoneCodeLoading: (v) => set({ isPhoneCodeLoading: v }),

      login: async (email, password) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Login failed');

          const user = await handleAuthSuccess(data.token, data.refreshToken);
          set({ user, token: data.token });

          const { useUIStore } = await import('./uiStore');
          useUIStore.getState().closeModals();
          toast.success('Login successful!');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
        }
      },

      signup: async (name, email, country_code, mobile_number, password, confirm_password) => {
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, country_code, mobile_number, password, confirm_password }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Signup failed');

          const user = await handleAuthSuccess(data.token);
          set({ user, token: data.token });

          const { useUIStore } = await import('./uiStore');
          useUIStore.getState().closeModals();
          toast.success('Account created successfully! Welcome to Koursair.');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Signup failed. Please try again.');
          throw error;
        }
      },

      forgotPassword: async (email) => {
        try {
          const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Failed to send reset link');
          toast.success('Password reset link sent to your email! Please check your inbox.');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to send reset link. Please try again.');
          throw error;
        }
      },

      requestOtp: async (email) => {
        try {
          const response = await fetch('/api/auth/request-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Failed to send OTP');
          toast.success(data.message || 'OTP has been sent to your email!');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to send OTP. Please try again.');
          throw error;
        }
      },

      signInWithOtp: async (email, otp) => {
        try {
          const response = await fetch('/api/auth/otp-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'OTP verification failed');

          const user = await handleAuthSuccess(data.token);
          set({ user, token: data.token });

          const { useUIStore } = await import('./uiStore');
          useUIStore.getState().closeModals();
          toast.success('Login successful with OTP! Welcome back.');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'OTP login failed. Please try again.');
          throw error;
        }
      },

      resetPasswordFromLink: async (email, newPassword, confirmPassword) => {
        const { resetToken } = get();
        if (!resetToken) {
          toast.error('Error: No reset token found. Please use the link from your email again.');
          throw new Error('No reset token found.');
        }
        try {
          const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: resetToken,
              email,
              new_password: newPassword,
              confirm_password: confirmPassword,
            }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Password reset failed');

          const { useUIStore } = await import('./uiStore');
          useUIStore.getState().closeModals();
          set({ resetToken: null });
          toast.success('Your password has been reset successfully! Please log in.');
          useUIStore.getState().openLogin();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to reset password. Please try again.');
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({ user: null, token: null });
        toast.info('Logged out successfully!');
      },

      handleOAuthCallback: async (router) => {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error || !data.session) {
            toast.error('Login failed. Please try again.');
            if (router) router.replace('/');
            return;
          }
          const session = data.session;
          const response = await fetch('/api/auth/social-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || 'Failed to authenticate with backend');

          const backendToken = result.data?.access_token;
          const user = await handleAuthSuccess(backendToken);
          set({ user, token: backendToken });

          if (router) router.replace('/');
        } catch {
          toast.error('Something went wrong during login.');
          if (router) router.replace('/');
        }
      },

      fetchPhoneCode: async () => {
        // Skip if already fetched
        const { detectedPhoneCode, isPhoneCodeLoading } = get();
        if (detectedPhoneCode && !isPhoneCodeLoading) return;

        try {
          const response = await fetch('/api/auth/country-code');
          if (!response.ok) {
            set({ detectedPhoneCode: '+91', isPhoneCodeLoading: false });
            return;
          }
          const data = await response.json();
          set({ detectedPhoneCode: data.calling_code || '+91', isPhoneCodeLoading: false });
        } catch {
          set({ detectedPhoneCode: '+91', isPhoneCodeLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
      partialize: (state: AuthState) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
