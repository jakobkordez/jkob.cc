const ncl = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
}

module.exports = ncl.withContentlayer(nextConfig);
