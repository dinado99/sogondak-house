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
      <Image
        src={aboutMain}
        alt="소곤닥하우스 전경"
        sizes="100vw"
        placeholder="blur"
        priority
      />
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
  line-height: 1.5;

  img {
    width: 100%;
    height: auto;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 80px;
    transition: 400ms;

    @media (max-width: 768px) {
      padding: 40px;
    }

    @media (max-width: 425px) {
      padding: 40px 20px;
    }
  }
`;
