'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    handleOAuthCallback(router);
  }, [router, handleOAuthCallback]);

  return (
    // Added 'flex-col' to stack loader and text, and background color to match
    <div className="flex flex-col items-center justify-center h-screen bg-[#F4EFE7]">
      <div className="w-64 h-64">
        <DotLottieReact
          src="/travel.lottie" // Make sure this matches your file path in public/
          loop
          autoplay
        />
      </div>
      <p className="text-lg font-semibold mt-4">Completing login...</p>
    </div>
  );
}