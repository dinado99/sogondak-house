import React from 'react';
import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, EffectFade } from 'swiper'; // 추가

SwiperCore.use([Pagination, Autoplay, EffectFade]); // 추가
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type TProps = {
  children: React.ReactNode;
};

const SwiperPhoto: React.FC<TProps> = (props) => {
  return (
    <StyledWrapper
      autoplay={{ delay: 5000 }} // 추가
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      navigation
      effect="fade"
      loop={true}
      pagination={{ clickable: true }}
    >
      {props.children}
    </StyledWrapper>
  );
};

export default SwiperPhoto;

const StyledWrapper = styled(Swiper)`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: var(--color-stone);

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #fff;
    opacity: 0.6;
    transition: width 250ms ease, opacity 250ms ease;
  }

  .swiper-pagination-bullet-active {
    width: 20px;
    opacity: 1;
    background: #fff;
  }

  /* 데스크톱에서는 한 화면 높이에 맞춤 */
  @media (min-width: 1025px) {
    aspect-ratio: auto;
    height: calc(100vh - var(--header-height));
    min-height: 560px;
    max-height: 960px;
  }
`;
