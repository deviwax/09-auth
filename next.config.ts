import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,

    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://notehub-api.goit.study/api/:path*',
      },
    ];
  },
};

export default nextConfig;
