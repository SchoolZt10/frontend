/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
        {
            source: '/api/:path*',
            destination: process.env.NODE_ENV === 'development1' ? `http://127.0.0.1:5000/api/:path*` : 'https://api.shooclzt10.site/api/:path*',
        },
    ];
  },
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "**",
        },
        {
            protocol: "http",
            hostname: "**",
        }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
