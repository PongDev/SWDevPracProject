/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendBaseURL: process.env.BACKEND_BASE_URL ?? "http://localhost:3001",
  },
};

module.exports = nextConfig;
