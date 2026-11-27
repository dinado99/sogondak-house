import React from 'react';
import styled from 'styled-components';
import Section from 'app.components/Section/Section';

const AboutTransportation = () => {
  return (
    <Section eyebrow="Transport" title="교통편 안내">
      <StyledWrapper>
        <div className="item">
          <div className="item-title">자가용 이용시</div>
          <div>제주국제공항으로부터 19km, 약 35분 소요</div>
        </div>
        <div className="item">
          <div className="item-title">대중교통 이용시</div>
          <div className="bus">
            <span className="bus-badge">101</span>
            <div>
              급행버스 · 공항 - 제주버스터미널 - 동광양 - 천수동 -
              오현중/고등학교 - 화북 남문 - 삼양초등학교 - 조천리사무소 -
              {` '`}함덕서우봉해변{`'`} 에서 하차
              <br />
              버스 진행 반대 방향으로 600m, 약 7분정도 쭉 걸어오시면 됩니다.
            </div>
          </div>
          <div className="bus">
            <span className="bus-badge">325</span>
            <div>
              일반 간선버스 · {`'`}함덕 비석거리{`'`}에서 하차 후 버스 진행
              방향으로 100m, 약 2분정도 쭉 걸어오시면 됩니다.
            </div>
          </div>
        </div>
      </StyledWrapper>
    </Section>
  );
};

export default AboutTransportation;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .item-title {
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: 6px;
  }

  .bus {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .bus-badge {
    flex-shrink: 0;
    margin-top: 4px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--color-main-soft);
    color: var(--color-main);
    font-size: 12px;
    line-height: 22px;
  }
`;
