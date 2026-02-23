"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';
import Popup from './Popup';
import { toast } from 'sonner';
// -------------------------


// --- Interface Updates ---
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authInitialized: boolean;
  showLoginModal: boolean;
  showSignupModal: boolean;
  showForgotPasswordModal: boolean;
  showOTPEmailModal: boolean;
  showCreateNewPasswordModal: boolean;
  resetToken: string | null;
  detectedPhoneCode: string | null;
  isPhoneCodeLoading: boolean;
  handleSessionExpired: () => void;
  openLogin: () => void;
  openSignup: () => void;
  openAuth: () => void;
  openForgotPassword: () => void;
  openOTPEmail: () => void;
  openCreateNewPassword: (token: string) => void;
  closeModals: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, country_code: string, mobile: string, password: string, confirm_password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  signInWithOtp: (email: string, otp: string) => Promise<void>;
  resetPasswordFromLink: (email: string, newPass: string, confirmPass: string) => Promise<void>;
  logout: () => void;
  switchToLogin: () => void;
  switchToSignup: () => void;
  switchToForgotPassword: () => void;
  switchToOTPEmail: () => void;
  switchToCreateNewPassword: (token: string) => void;
  handleOAuthCallback: (router?: ReturnType<typeof useRouter>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// --- POPUP INTEGRATION ---
// Define the type for the popup state
type PopupConfig = {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}
// -------------------------


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOTPEmailModal, setShowOTPEmailModal] = useState(false);
  const [showCreateNewPasswordModal, setShowCreateNewPasswordModal] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);
  const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);
  const [detectedPhoneCode, setDetectedPhoneCode] = useState<string | null>(null);
  const [isPhoneCodeLoading, setIsPhoneCodeLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  const isAuthenticated = !!user;


  // const showPopup = (
  //   message: string,
  //   type: PopupConfig['type'] = 'info',
  //   options?: Pick<PopupConfig, 'duration' | 'actionLabel' | 'onAction'>
  // ) => {
  //   setPopupConfig({ message, type, ...options });
  // };

  const closePopup = () => {
    setPopupConfig(null);
    setSessionExpiredOpen(false);
  };


  useEffect(() => {
    supabase.auth.getSession()
  }, [])
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setAuthInitialized(true);
  }, []);


  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch("/api/auth/country-code");

        if (!response.ok) {
          console.warn("Country code API failed");
          setDetectedPhoneCode("+91");
          return;
        }

        const data = await response.json();
        setDetectedPhoneCode(data.calling_code || "+91");

      } catch (error) {
        console.warn("Country code detection failed:", error);
        setDetectedPhoneCode("+91");
      } finally {
        setIsPhoneCodeLoading(false);
      }
    };

    if (isAuthenticated) {
      setDetectedPhoneCode(null);
      setIsPhoneCodeLoading(false);
    } else {
      setIsPhoneCodeLoading(true);
      fetchCode();
    }
  }, [isAuthenticated]);




  // --- Modal control functions (Updated to include new modals) ---
  const closeModals = useCallback(() => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowForgotPasswordModal(false);
    setShowOTPEmailModal(false);
    setShowCreateNewPasswordModal(false);
    setResetToken(null); // Clear reset token on close
  }, []);

  const openLogin = useCallback(() => {
    closeModals();
    setShowLoginModal(true);
  }, [closeModals]);


  const openSignup = () => {
    closeModals();
    setShowSignupModal(true);
  };

  const openForgotPassword = () => {
    closeModals();
    setShowForgotPasswordModal(true);
  };

  const openOTPEmail = () => {
    closeModals();
    setShowOTPEmailModal(true);
  }

  const openCreateNewPassword = (token: string) => {
    closeModals();
    setResetToken(token);
    setShowCreateNewPasswordModal(true);
  }
  const openAuth = () => {
    if (
      !showLoginModal &&
      !showSignupModal &&
      !showForgotPasswordModal &&
      !showOTPEmailModal &&
      !showCreateNewPasswordModal
    ) {
      openLogin();
    }
  };
  const switchToLogin = () => openLogin();
  const switchToSignup = () => openSignup();
  const switchToForgotPassword = () => openForgotPassword();
  const switchToOTPEmail = () => openOTPEmail();
  const switchToCreateNewPassword = (token: string) => openCreateNewPassword(token);

  // Inside AuthContext.tsx

const handleSessionExpired = useCallback(() => {
    if (sessionExpiredOpen) return;
    if (showLoginModal || showOTPEmailModal || showForgotPasswordModal || showCreateNewPasswordModal|| showSignupModal) {
      return; 
    }
    const currentToken = token ?? localStorage.getItem("token");
    const isExpired = currentToken ? isJwtExpired(currentToken) : false;
    // Logic for protected pages
    const onProtectedPage =
      pathname?.toLowerCase() === "/your_bookings" ||
      pathname?.toLowerCase().startsWith("/tour/kenya")||
      pathname?.toLowerCase().startsWith("/booking");

    if (!currentToken) {
      if (onProtectedPage) {
        setSessionExpiredOpen(false);
        closeModals();
        openLogin();
      }
      return;
    }
    if (!isExpired) return;

    setToken(null);
    setUser(null);
    closeModals();
    if (onProtectedPage) {
      setSessionExpiredOpen(true);}

}, [
    sessionExpiredOpen, showSignupModal, showLoginModal, showOTPEmailModal, showForgotPasswordModal, 
    showCreateNewPasswordModal, token, pathname, 
    openLogin, closeModals
]);

  useEffect(() => {
    if (!authInitialized) return;

    const currentToken = token ?? localStorage.getItem("token");
    if (!currentToken) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    try {
      const payload = JSON.parse(atob(currentToken.split(".")[1]));
      const expMs = typeof payload.exp === "number" ? payload.exp * 1000 : 0;
      const delay = expMs - Date.now();

      if (delay <= 0) {
        handleSessionExpired();
        return;
      }

      timeoutId = setTimeout(() => {
        handleSessionExpired();
      }, delay);
    } catch {
      // If token is malformed, treat as expired
      handleSessionExpired();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [authInitialized, token, handleSessionExpired]);


  const handleAuthSuccess = async (token: string) => {
    if (!token) {
      throw new Error("No token provided to handleAuthSuccess");
    }

    localStorage.setItem('token', token);
    setToken(token);

    try {
      const response = await fetch('/api/auth/details', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user details");
      }

      const user = data.user;

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      return user;

    } catch (error) {
      //console.error("Failed to fetch user details after auth:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      throw error;
    }
  };


  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      closeModals();
      await handleAuthSuccess(data.token);


      toast.success('Login successful!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  // ============================================
  // 🚀 API INTEGRATION FUNCTIONS - OTP REQUEST (No Change)
  // ============================================
  const requestOtp = async (email: string) => {
    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
      // --- POPUP REPLACEMENT ---
      toast.success(data.message || 'OTP has been sent to your email!');
      // -------------------------

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      // --- POPUP REPLACEMENT ---
      toast.error(errorMessage);
      // -------------------------
      throw error;
    }
  };

  // ============================================
  // 🚀 API INTEGRATION FUNCTIONS - OTP LOGIN (UPDATED)
  // ============================================
  const signInWithOtp = async (email: string, otp: string) => {
    try {
      const response = await fetch('/api/auth/otp-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      await handleAuthSuccess(data.token);

      closeModals();
      // --- POPUP REPLACEMENT ---
      toast.success('Login successful with OTP! Welcome back.');
      // -------------------------
      window.location.reload();
    } catch (error) {
      //console.error('OTP Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'OTP login failed. Please try again.';
      // --- POPUP REPLACEMENT ---
      toast.error(errorMessage);
      // -------------------------
      throw error;
    }
  };


  // ============================================
  // 🚀 API INTEGRATION FUNCTIONS - SIGNUP (UPDATED)
  // ============================================
  const signup = async (name: string, email: string, country_code: string, mobile_number: string, password: string, confirm_password: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, country_code, mobile_number, password, confirm_password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      await handleAuthSuccess(data.token);

      closeModals();
      // --- POPUP REPLACEMENT ---
      toast.success('Account created successfully! Welcome to Koursair.');
      // -------------------------
      window.location.reload();
    } catch (error) {
      //console.error('Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      // --- POPUP REPLACEMENT ---
      toast.error(errorMessage);
      // -------------------------
      throw error;
    }
  };

  // ============================================
  // 🚀 API INTEGRATION FUNCTIONS - FORGOT PASSWORD (No Change)
  // ============================================
  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      // --- POPUP REPLACEMENT ---
      toast.success('Password reset link sent to your email! Please check your inbox.');
      // -------------------------

    } catch (error) {
      //console.error('Forgot password error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset link. Please try again.';
      // --- POPUP REPLACEMENT ---
      toast.error(errorMessage);
      // -------------------------
      throw error;
    }
  };


  const resetPasswordFromLink = async (email: string, newPassword: string, confirmPassword: string) => {
    if (!resetToken) {
      toast.error("Error: No reset token found. Please use the link from your email again.");
      throw new Error("No reset token found.");
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken, // Use the token from state
          email: email,
          new_password: newPassword,
          confirm_password: confirmPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      closeModals(); // Closes modal and clears token
      toast.success('Your password has been reset successfully! Please log in.');
      switchToLogin();

    } catch (error) {
      //console.error('Password reset error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset password. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };


  const handleOAuthCallback = async (router?: ReturnType<typeof useRouter>) => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {

        toast.error('Login failed. Please try again.');
        // -------------------------
        if (router) router.replace('/');
        return;
      }

      const session = data.session;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to authenticate with backend');
      }

      const backendToken = result.data?.access_token;
      await handleAuthSuccess(backendToken);



      if (router) router.replace('/');
    } catch {
      toast.error('Something went wrong during login.');

      if (router) router.replace('/');
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setToken(null);


    toast.info('Logged out successfully!');

  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    showLoginModal,
    showSignupModal,
    showForgotPasswordModal,
    showOTPEmailModal,
    showCreateNewPasswordModal,
    resetToken,
    detectedPhoneCode,
    isPhoneCodeLoading,
    authInitialized,
    handleSessionExpired,
    openLogin,
    openSignup,
    openAuth,
    openForgotPassword,
    openOTPEmail,
    openCreateNewPassword,
    closeModals,
    login,
    signup,
    forgotPassword,
    requestOtp,
    signInWithOtp,
    resetPasswordFromLink,
    logout,
    switchToLogin,
    switchToSignup,
    switchToForgotPassword,
    switchToOTPEmail,
    switchToCreateNewPassword,
    handleOAuthCallback
  };

  // --- POPUP INTEGRATION ---
  // 4. Render the Provider and the Popup component
  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* This will render the popup on top of your app content 
        whenever popupConfig is not null.
      */}
      {popupConfig && (
        <Popup
          message={popupConfig.message}
          type={popupConfig.type}
          onClose={closePopup}
          duration={popupConfig.duration}
          actionLabel={popupConfig.actionLabel}
          onAction={popupConfig.onAction}
        />
      )}

      {sessionExpiredOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white">
          <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 text-center">
            <h3 className="text-3xl font-semibold text-primary mb-2">Session Ended</h3>
            <p className="text-gray-600 text-lg mb-6">For security reasons, your session has expired. Please sign in again.</p>
            <div className="flex items-center justify-center gap-3">

              <button
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                onClick={() => {
                  setSessionExpiredOpen(false);
                  openLogin();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const isJwtExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};
