// Netlify 배포에서 next/image 를 Netlify Image CDN(/.netlify/images)으로 처리한다.
// (기존 Next.js 런타임의 /_ipx 이미지 함수가 502 를 반환해 로고 등이 깨지는 문제 해결)
export default function netlifyImageLoader({ src, width, quality }) {
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality || 75),
  });
  return `/.netlify/images?${params.toString()}`;
}
