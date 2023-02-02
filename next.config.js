/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
