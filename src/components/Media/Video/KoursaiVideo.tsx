"use client";

import { useState, useRef, useEffect, VideoHTMLAttributes } from "react";

interface KoursairVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fill?: boolean;
}

export default function KoursairVideo({
  src,
  className = "",
  fill = false,
  poster,
  ...props
}: KoursairVideoProps) {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const shimmerClass =
    "animate-pulse bg-gray-200 dark:bg-gray-400 rounded-md absolute inset-0 z-10";

  useEffect(() => {
    // Check if video is already ready (e.g., from cache) when component mounts
    const video = videoRef.current;
    if (video) {
      // readyState 3 means HAVE_FUTURE_DATA (enough to play)
      // readyState 4 means HAVE_ENOUGH_DATA
      // If it's >= 2 (HAVE_CURRENT_DATA), we have the first frame, so we can hide shimmer
      if (video.readyState >= 2) {
        setLoading(false);
      }
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${fill ? "absolute inset-0 w-full h-full" : ""}`}
    >
      {/* Shimmer Skeleton Loader */}
      {loading && <div className={shimmerClass} />}

      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        onLoadedData={() => setLoading(false)}
        className={`object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        } ${fill ? "w-full h-full" : ""} ${className}`}

        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        {...props}
      />
    </div>
  );
}