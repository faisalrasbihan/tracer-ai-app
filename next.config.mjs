/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  output: 'standalone',
  staticPageGenerationTimeout: 300,
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
