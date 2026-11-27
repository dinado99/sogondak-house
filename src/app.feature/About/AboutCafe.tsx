import React from 'react';
import styled from 'styled-components';
import Section from 'app.components/Section/Section';

const AboutCafe = () => {
  return (
    <Section eyebrow="Cafe" title="카페 호다">
      <StyledWrapper>
        <p>
          건물 1층에서 함께 운영 중인 공간으로, 오전 11시부터 오후 18시까지
          열려있습니다. (수요일 정기 휴무)
        </p>
        <a
          href="https://www.instagram.com/hoda_jeju/"
          target="_blank"
          rel="noreferrer"
          className="insta"
        >
          @hoda_jeju 인스타그램 보기 →
        </a>
      </StyledWrapper>
    </Section>
  );
};

export default AboutCafe;

const StyledWrapper = styled.div`
  .insta {
    display: inline-block;
    margin-top: 8px;
    color: var(--color-main);
    border-bottom: 1px solid currentColor;
  }
`;
