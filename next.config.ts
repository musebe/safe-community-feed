// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/demo-article-projects/**",
        search: "",
      },
    ],
    // Next 16 needs an allow list for quality
    qualities: [75],
    // Use WebP when possible
    formats: ["image/webp"],
  },
};

export default nextConfig;
