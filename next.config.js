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
  async headers() {
    return [];
  },
};

module.exports = nextConfig; 