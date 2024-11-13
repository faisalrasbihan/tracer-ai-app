/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      stream: false,
      path: false,
      buffer: require.resolve('buffer/'),
    };
    return config;
  },
}

module.exports = nextConfig 