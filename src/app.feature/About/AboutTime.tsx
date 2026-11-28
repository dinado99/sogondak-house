import React from 'react';
import styled from 'styled-components';
import Section from 'app.components/Section/Section';

const AboutTime = () => {
  return (
    <Section eyebrow="Time" title="입실 · 퇴실">
      <StyledWrapper>
        <div className="time-grid">
          <div className="time-card">
            <div className="time-label">Check-in</div>
            <div className="time-value">16:00</div>
          </div>
          <div className="time-card">
            <div className="time-label">Check-out</div>
            <div className="time-value">11:00</div>
          </div>
        </div>
        <div className="time-info">
          * 레이트 체크아웃은 시간당 10,000원의 추가요금이 발생합니다.
        </div>
      </StyledWrapper>
    </Section>
  );
};

export default AboutTime;

const StyledWrapper = styled.div`
  .time-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 14px;
  }

  .time-card {
    padding: 20px 24px;
    background: var(--color-stone);
    border-radius: 12px;
  }

  .time-label {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .time-value {
    font-size: 30px;
    color: var(--color-ink);
    line-height: 1.4;
  }

  .time-info {
    font-size: 12px;
    color: var(--color-muted);
  }
`;
