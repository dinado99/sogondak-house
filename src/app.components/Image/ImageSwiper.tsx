import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

type TProps = {
  src: string;
  alt: string;
  /** 첫 번째 슬라이드처럼 화면에 바로 보이는 이미지는 true (LCP 개선) */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * 스와이퍼용 이미지.
 * next/image 로 원본 대신 화면 크기에 맞게 리사이즈된 AVIF/WebP 를 받아온다.
 */
const ImageSwiper: React.FC<TProps> = ({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  className,
}) => {
  if (!src) return null;

  return (
    <StyledImgView className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        style={{ objectFit: 'cover' }}
      />
    </StyledImgView>
  );
};

export default ImageSwiper;

const StyledImgView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 4;
`;
