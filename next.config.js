/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
  JWT_SECRET: 'super secret'
  }
}

module.exports = nextConfig
