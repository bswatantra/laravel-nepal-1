import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    serverComponentsExternalPackages: [
      "@sparticuz/chromium-min",
    ],
  },
  outputFileTracingIncludes: {
    "api/articles": ["./node_modules/@sparticuz/chromium-min/**/*"],
    "api/blogs": ["./node_modules/@sparticuz/chromium-min/**/*"],
  },
  turbopack: {},

  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picperf.io",
      },
      {
        protocol: "https",
        hostname: "laravelnews.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "laravelmagazine.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // Headers for better security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
