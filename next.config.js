/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "localhost",
      "i.ibb.co",
      "hanoicomputercdn.com",
      "tailus.io",
      "i.pravatar.cc",
      "vojislavd.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  swcMinify: true,
  env: {
    API_URL: "http://localhost:3001/api",
    SOCKET_URL: "http://localhost:3001",
    GOOGLE_CLIENT_ID:
      "1094378953502-js08ecvf0ecdi25pc31q3q4m0pbjs73n.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "mg+eY6YYTirnpMVU/joaQY7fCHO3R9YAbZfntDZMHes",
  },
};

module.exports = nextConfig;
