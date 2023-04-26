const frontendConfig = require("config").frontendConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendBaseURL: frontendConfig.backendBaseURL,
  },
};

module.exports = nextConfig;
