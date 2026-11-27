import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import aboutMain from '../../../public/images/about/main.jpeg';
import AboutCafe from './AboutCafe';
import AboutMap from './AboutMap';
import AboutParking from './AboutParking';
import AboutTime from './AboutTime';
import AboutTransportation from './AboutTransportation';

const ScreenAbout = () => {
  return (
    <StyledWrapper>
      <div className="about-hero">
        <Image
          src={aboutMain}
          alt="소곤닥하우스 전경"
          sizes="100vw"
          placeholder="blur"
          priority
        />
        <div className="about-hero-text">
          <div className="eyebrow">About</div>
          <h1>함덕의 소담스러운 돌담집</h1>
        </div>
      </div>
      <div className="about-content">
        <AboutTime />
        <AboutMap />
        <AboutTransportation />
        <AboutParking />
        <AboutCafe />
      </div>
    </StyledWrapper>
  );
};

export default ScreenAbout;

const StyledWrapper = styled.div`
  width: 100%;

  .about-hero {
    position: relative;
    height: 56vh;
    min-height: 320px;
    max-height: 560px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.45),
        rgba(0, 0, 0, 0) 60%
      );
    }
  }

  .about-hero-text {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 880px;
    margin: 0 auto;
    padding: 0 24px 40px;
    color: #fff;

    .eyebrow {
      font-size: 12px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      margin-bottom: 10px;
      opacity: 0.9;
    }

    h1 {
      font-size: 30px;
      letter-spacing: 0.02em;
    }
  }

  .about-content {
    max-width: 880px;
    margin: 0 auto;
    padding: 40px 24px 40px;

    & > section:first-child {
      border-top: none;
    }
  }

  @media (max-width: 640px) {
    .about-hero {
      height: 44vh;
    }

    .about-hero-text h1 {
      font-size: 22px;
    }
  }
`;
