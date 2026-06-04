import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'springshairrestoration.com',
      },
    ],
  },
};

export default nextConfig;