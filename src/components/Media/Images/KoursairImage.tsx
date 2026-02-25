"use client";

import Image, { ImageProps } from "next/image";
import { useState, memo, useCallback } from "react";

interface KoursairImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallback?: string;
}

const KoursairImage = memo(function KoursairImage({
  src,
  alt,
  width,
  height,
  fill,
  fallback = "/fallback.jpg",
  className = "",
  ...props
}: KoursairImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const shimmerClass =
    "animate-pulse bg-gray-200 dark:bg-gray-400 rounded-md absolute inset-0";

  const handleLoad = useCallback(() => {
    setLoading((prev) => (prev ? false : prev));
  }, []);

  const handleError = useCallback(() => {
    setImgSrc(fallback);
    setLoading(false);
  }, [fallback]);

  return (
  <div
    className="relative overflow-hidden"
    style={fill ? { width: "100%", height: "100%" } : undefined}
  >
      {/* Shimmer Skeleton Loader */}
      {loading && <div className={shimmerClass} />}

      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`${className} transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
});

export default KoursairImage;
