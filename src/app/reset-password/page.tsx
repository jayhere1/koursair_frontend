"use client";

import React, { useEffect, Suspense } from 'react';
// --- 1. REMOVE the 'useHash' import ---
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import HomePage from '@/app/page'; // Import your Home Page
import Popup from '@/components/Popup';

/**
 * This component handles the logic of reading the URL
 * and opening the modal.
 */
function ResetPasswordLogic() {
  const { switchToCreateNewPassword } = useAuth();
  const searchParams = useSearchParams();
  const [popup, setPopup] = React.useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  // We use a ref to ensure we don't try to open the modal multiple times
  const hasOpenedRef = React.useRef(false);

  useEffect(() => {
    // 1. Get the hash
    const hash = window.location.hash;
    
    // 2. Check if hash exists and we haven't opened the modal yet
    if (hash && !hasOpenedRef.current) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      
      if (token) {
        // 3. Mark as opened so we don't loop
        hasOpenedRef.current = true;
        
        // 4. Open the modal
        switchToCreateNewPassword(token);

        // 5. CRITICAL: Clear the hash from the URL so it doesn't trigger again on re-renders
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        setPopup({ message: 'Invalid password reset link', type: 'error' });
      }
    }
  }, [searchParams, switchToCreateNewPassword]);

  return popup ? <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} /> : null;
}


// This is the default export for the page
export default function ResetPasswordPage() {
  return (
    // Suspense is needed because useSearchParams is used
    <Suspense fallback={<div>Loading...</div>}>
      {/* 1. Render your Home Page as the background */}
      <HomePage /> 
      {/* 2. Render the logic that opens the modal on top */}
      <ResetPasswordLogic />
    </Suspense>
  );
}