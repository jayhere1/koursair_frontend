"use client"; // This directive is important for Lottie components

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4EFE7]">
      {/* Option A: Use a direct URL (if you have a hosted link)
         Option B: Use a local file (put the json file in your public folder)
      */}
      <div className="w-64 h-64"> {/* Control size here */}
        <DotLottieReact
          src="/travel.lottie" // Replace this with your actual URL or file path like "/travel-loader.json"
          loop
          autoplay
        />
      </div>
      <p className="text-lg font-semibold mt-4">Loading payment status...</p>
    </div>
  );
}