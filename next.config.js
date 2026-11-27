/** @type {import('next').NextConfig} */
const isNetlify = process.env.NETLIFY === 'true';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['velog.velcdn.com'],
    formats: ['image/avif', 'image/webp'],
    // Netlify 빌드에서만 Netlify Image CDN 사용 (로컬/다른 호스팅은 기본 동작)
    ...(isNetlify && {
      loader: 'custom',
      loaderFile: './src/netlifyImageLoader.js',
    }),
  },
};

module.exports = nextConfig;
