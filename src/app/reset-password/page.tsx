"use client";

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUIStore } from '@/stores';
import Navbar from '@/components/Navbar';
import Popup from '@/components/Popup';

function ResetPasswordLogic() {
  const switchToCreateNewPassword = useUIStore((s) => s.switchToCreateNewPassword);
  const searchParams = useSearchParams();
  const [popup, setPopup] = React.useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const hasOpenedRef = React.useRef(false);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash && !hasOpenedRef.current) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        hasOpenedRef.current = true;
        switchToCreateNewPassword(token);
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        setPopup({ message: 'Invalid password reset link', type: 'error' });
      }
    }
  }, [searchParams, switchToCreateNewPassword]);

  return popup ? <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} /> : null;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div className="min-h-screen bg-[#F4EFE7] flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-lg">Resetting your password...</p>
        </div>
      </div>
      <ResetPasswordLogic />
    </Suspense>
  );
}