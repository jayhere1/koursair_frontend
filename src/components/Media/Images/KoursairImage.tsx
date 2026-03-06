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
  fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E",
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
