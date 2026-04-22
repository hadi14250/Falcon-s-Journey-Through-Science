import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Force long cache headers on static character/shop assets even in dev,
     so the AssetPreloader's warm cache actually sticks across navigations.
     Without this, Next dev server returns max-age=0 and the browser
     revalidates every image on every souq mount, defeating the preload. */
  async headers() {
    return [
      {
        source: "/:path(humans|companions|shop|avatars)/:rest*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
