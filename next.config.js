/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 네이버 지도 Client ID 를 클라이언트 번들에서도 쓸 수 있도록 빌드 시 주입
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
  },
  images: {
    domains: ['velog.velcdn.com'],
    formats: ['image/avif', 'image/webp'],
    // 이미지 URL 이 바뀌지 않으므로 최적화 결과를 오래 캐시 (1년)
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

module.exports = nextConfig;
