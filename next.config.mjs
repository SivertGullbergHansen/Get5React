/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@lobehub/ui', 'ant-design/nextjs-registry', 'antd'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.steamstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
