import { useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, isJwtExpired } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

export const useProtectedPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const authInitialized = useAuthStore((s) => s.authInitialized);
  const handleSessionExpired = useUIStore((s) => s.handleSessionExpired);

  const showLoginModal = useUIStore((s) => s.showLoginModal);
  const showSignupModal = useUIStore((s) => s.showSignupModal);
  const showForgotPasswordModal = useUIStore((s) => s.showForgotPasswordModal);
  const showOTPEmailModal = useUIStore((s) => s.showOTPEmailModal);
  const showCreateNewPasswordModal = useUIStore((s) => s.showCreateNewPasswordModal);

  const isSessionInvalid = useMemo(() => {
    if (!authInitialized) return false;
    return !token || isJwtExpired(token);
  }, [authInitialized, token]);

  const isAuthFlowActive = showLoginModal || showOTPEmailModal || showForgotPasswordModal || showCreateNewPasswordModal || showSignupModal;

  // Track whether we already prompted the user to log in
  const authFlowTriggered = useRef(false);

  // Reset when auth succeeds
  useEffect(() => {
    if (!isSessionInvalid) {
      authFlowTriggered.current = false;
    }
  }, [isSessionInvalid]);

  useEffect(() => {
    if (!authInitialized) return;
    if (isSessionInvalid && !isAuthFlowActive) {
      if (authFlowTriggered.current) {
        // User dismissed the login modal without authenticating — redirect home
        router.replace('/');
        return;
      }
      authFlowTriggered.current = true;
      handleSessionExpired(pathname ?? undefined);
    }
  }, [authInitialized, isSessionInvalid, isAuthFlowActive, handleSessionExpired, pathname, router]);

  return {
    isReady: authInitialized,
    isAuthenticated: !!token && !isSessionInvalid,
    isSessionInvalid,
  };
};
