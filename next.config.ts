import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "0v6xwqiijv.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  typescript: {
    // !! WARN !! ปิดการตรวจ TypeScript ใน build
    ignoreBuildErrors: true,
  },
  distDir: "build",
};

export default nextConfig;
