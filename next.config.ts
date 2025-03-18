import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/_:path*",
        destination: "/_:path*",
      },
      {
        source: "/api/:path*",
        destination: "/api/:path*", // This ensures "/api" is handled as an API route
      },
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
  output: "standalone",
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;