"use client";

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore, isJwtExpired } from './authStore';
import { useUIStore } from './uiStore';
import Popup from '@/components/Popup';

export default function StoreHydration({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const sessionExpiredOpen = useUIStore((s) => s.sessionExpiredOpen);
  const setSessionExpiredOpen = useUIStore((s) => s.setSessionExpiredOpen);
  const openLogin = useUIStore((s) => s.openLogin);
  const popupConfig = useUIStore((s) => s.popupConfig);
  const closePopup = useUIStore((s) => s.closePopup);

  // Hydrate auth from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        useAuthStore.setState({
          token: savedToken,
          user: JSON.parse(savedUser),
        });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    useAuthStore.setState({ authInitialized: true });
    useAuthStore.getState().fetchPhoneCode();
  }, []);

  // Session expiry watcher
  const handleSessionExpired = useUIStore((s) => s.handleSessionExpired);

  const checkSessionExpiry = useCallback(() => {
    const { token, authInitialized } = useAuthStore.getState();
    if (!authInitialized) return;

    const currentToken = token ?? localStorage.getItem('token');
    if (!currentToken) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    try {
      const payload = JSON.parse(atob(currentToken.split('.')[1]));
      const expMs = typeof payload.exp === 'number' ? payload.exp * 1000 : 0;
      const delay = expMs - Date.now();

      if (delay <= 0) {
        handleSessionExpired(pathname ?? undefined);
        return;
      }

      timeoutId = setTimeout(() => {
        handleSessionExpired(pathname ?? undefined);
      }, delay);
    } catch {
      handleSessionExpired(pathname ?? undefined);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleSessionExpired, pathname]);

  // Re-check session on token or authInitialized change
  useEffect(() => {
    const unsub = useAuthStore.subscribe((state, prev) => {
      if (state.authInitialized !== prev.authInitialized || state.token !== prev.token) {
        checkSessionExpiry();
      }
    });

    // Initial check
    checkSessionExpiry();
    return unsub;
  }, [checkSessionExpiry]);

  return (
    <>
      {children}

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
            <p className="text-gray-600 text-lg mb-6">
              For security reasons, your session has expired. Please sign in again.
            </p>
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
    </>
  );
}
