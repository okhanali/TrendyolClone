import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },

      {
        protocol: 'https',
        hostname: 'cdn.cimri.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dsmcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bikelifejeans.com',
      },
      {
        protocol: 'https',
        hostname: 'static.ticimax.cloud',
      },
      {
        protocol: 'https',
        hostname: 'ktnimg2.mncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'floimages.mncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'shop.mango.com',
      },
      {
        protocol: 'https',
        hostname: 'korayspor.sm.mncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static.bershka.net',
      },
      {
        protocol: 'https',
        hostname: 'static.pullandbear.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.akakce.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.rossmann.com.tr',
      },
      {
        protocol: 'https',
        hostname: 'istekirtasiye.com',
      },
      {
        protocol: 'https',
        hostname: 'ardenmarket.com.tr',
      },
    ],
  },
};

export default nextConfig;
