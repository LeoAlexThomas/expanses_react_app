/** @type {import('next').NextConfig} */

const getEnvConfig = () => {
  switch (process.env.ENV) {
    case "dev":
      return {
        env: "dev",
        apiUrl: "http://localhost:3001/.netlify/functions/api",
        websiteUrl: "http://localhost:3000",
      };
    case "prod":
      return {
        env: "prod",
        apiUrl: "https://expanse-backend.netlify.app/.netlify/functions/api",
        websiteUrl: "https://expanses.com/api",
      };
  }
};
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  publicRuntimeConfig: getEnvConfig(),
};

module.exports = nextConfig;
