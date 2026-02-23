import { useEffect, useMemo } from 'react';
import { useAuth } from '@/components/AuthContext';
import { isJwtExpired } from '@/components/AuthContext';
export const useProtectedPage = () => {
  const { 
    token, 
    authInitialized, 
    handleSessionExpired,
    showCreateNewPasswordModal,
    showSignupModal,
    showLoginModal,
    showOTPEmailModal,
    showForgotPasswordModal
  } = useAuth();

  const isSessionInvalid = useMemo(() => {
    if (!authInitialized) return false;
    return !token || isJwtExpired(token);
  }, [authInitialized, token]);

  // Check if user is currently trying to log in
  const isAuthFlowActive = showLoginModal || showOTPEmailModal || showForgotPasswordModal || showCreateNewPasswordModal || showSignupModal;

  useEffect(() => {
    if (!authInitialized) return;

    // Only trigger expiration handler if session is invalid AND 
    // the user isn't actively interacting with an auth modal
    if (isSessionInvalid && !isAuthFlowActive) {
      handleSessionExpired();
    }
  }, [authInitialized, isSessionInvalid, isAuthFlowActive, handleSessionExpired]);

  return {
    isReady: authInitialized,
    isAuthenticated: !!token && !isSessionInvalid,
    isSessionInvalid,
  };
};