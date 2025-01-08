/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
      domains: ['firebasestorage.googleapis.com'], // Allow Firebase Storage domain for images
    },
  };
  
  module.exports = nextConfig;
  