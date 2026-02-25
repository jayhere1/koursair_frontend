import { create } from 'zustand';
import { useAuthStore, isJwtExpired } from './authStore';

type PopupConfig = {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
};

interface UIState {
  showLoginModal: boolean;
  showSignupModal: boolean;
  showForgotPasswordModal: boolean;
  showOTPEmailModal: boolean;
  showCreateNewPasswordModal: boolean;
  sessionExpiredOpen: boolean;
  popupConfig: PopupConfig | null;

  // Actions
  closeModals: () => void;
  openLogin: () => void;
  openSignup: () => void;
  openAuth: () => void;
  openForgotPassword: () => void;
  openOTPEmail: () => void;
  openCreateNewPassword: (token: string) => void;
  closePopup: () => void;
  setSessionExpiredOpen: (v: boolean) => void;

  // Switch helpers
  switchToLogin: () => void;
  switchToSignup: () => void;
  switchToForgotPassword: () => void;
  switchToOTPEmail: () => void;
  switchToCreateNewPassword: (token: string) => void;

  // Session expired handler
  handleSessionExpired: (pathname?: string) => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  showLoginModal: false,
  showSignupModal: false,
  showForgotPasswordModal: false,
  showOTPEmailModal: false,
  showCreateNewPasswordModal: false,
  sessionExpiredOpen: false,
  popupConfig: null,

  closeModals: () => {
    set({
      showLoginModal: false,
      showSignupModal: false,
      showForgotPasswordModal: false,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: false,
    });
    useAuthStore.getState().setResetToken(null);
  },

  openLogin: () => {
    set({
      showLoginModal: true,
      showSignupModal: false,
      showForgotPasswordModal: false,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: false,
    });
  },

  openSignup: () => {
    set({
      showLoginModal: false,
      showSignupModal: true,
      showForgotPasswordModal: false,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: false,
    });
  },

  openAuth: () => {
    const s = get();
    if (!s.showLoginModal && !s.showSignupModal && !s.showForgotPasswordModal && !s.showOTPEmailModal && !s.showCreateNewPasswordModal) {
      get().openLogin();
    }
  },

  openForgotPassword: () => {
    set({
      showLoginModal: false,
      showSignupModal: false,
      showForgotPasswordModal: true,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: false,
    });
  },

  openOTPEmail: () => {
    set({
      showLoginModal: false,
      showSignupModal: false,
      showForgotPasswordModal: false,
      showOTPEmailModal: true,
      showCreateNewPasswordModal: false,
    });
  },

  openCreateNewPassword: (token: string) => {
    set({
      showLoginModal: false,
      showSignupModal: false,
      showForgotPasswordModal: false,
      showOTPEmailModal: false,
      showCreateNewPasswordModal: true,
    });
    useAuthStore.getState().setResetToken(token);
  },

  closePopup: () => set({ popupConfig: null, sessionExpiredOpen: false }),
  setSessionExpiredOpen: (v) => set({ sessionExpiredOpen: v }),

  switchToLogin: () => get().openLogin(),
  switchToSignup: () => get().openSignup(),
  switchToForgotPassword: () => get().openForgotPassword(),
  switchToOTPEmail: () => get().openOTPEmail(),
  switchToCreateNewPassword: (token: string) => get().openCreateNewPassword(token),

  handleSessionExpired: (pathname?: string) => {
    const state = get();
    if (state.sessionExpiredOpen) return;
    if (state.showLoginModal || state.showOTPEmailModal || state.showForgotPasswordModal || state.showCreateNewPasswordModal || state.showSignupModal) return;

    const authState = useAuthStore.getState();
    const currentToken = authState.token ?? (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    const isExpired = currentToken ? isJwtExpired(currentToken) : false;

    const onProtectedPage =
      pathname?.toLowerCase() === '/your_bookings' ||
      pathname?.toLowerCase()?.startsWith('/tour/kenya') ||
      pathname?.toLowerCase()?.startsWith('/booking');

    if (!currentToken) {
      if (onProtectedPage) {
        set({ sessionExpiredOpen: false });
        get().closeModals();
        get().openLogin();
      }
      return;
    }
    if (!isExpired) return;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    useAuthStore.setState({ token: null, user: null });
    get().closeModals();
    if (onProtectedPage) {
      set({ sessionExpiredOpen: true });
    }
  },
}));
