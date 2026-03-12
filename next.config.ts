import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "koursair-media-996549485205-ap-south-1.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
