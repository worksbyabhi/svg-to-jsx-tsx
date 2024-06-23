/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  basePath: process.env.NODE_ENV === "development" ? "" : "/svg-to-jsx-tsx",
};

export default nextConfig;
