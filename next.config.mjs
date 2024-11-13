/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust this value based on your needs
    },
  },
};

export default nextConfig;
