import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.loc.gov',
        port: '',
        pathname: '/static/portals/free-to-use/public-domain/presidential-portraits/**',
      },
    ],
  },
};

export default nextConfig;

