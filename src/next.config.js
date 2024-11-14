/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      canvas: false,
    };
    return config;
  },
  // Add this to handle PDF.js worker
  experimental: {
    optimizeCss: true,
    esmExternals: false
  }
};

module.exports = nextConfig; 