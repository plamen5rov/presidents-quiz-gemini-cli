import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Disable optimization in development to avoid caching issues
    unoptimized: process.env.NODE_ENV === 'development',
    
    // Add any external domains if you ever use external images
    remotePatterns: [
      // Example for external domains (uncomment if needed):
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
    
    // Cache settings for better performance
    minimumCacheTTL: 60,
    
    // Image formats to support
    formats: ['image/webp', 'image/avif'],
  },
  
  // Additional performance optimizations
  compress: true,
  
  // Enable static export if you want (optional)
  // output: 'export',
  
  // Base path if deploying to subdirectory (optional)
  // basePath: '/your-app',
};

export default nextConfig;
