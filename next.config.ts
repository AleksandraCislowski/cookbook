import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    path: '/image-optimization-disabled',
    unoptimized: true,
  },
};

export default nextConfig;
