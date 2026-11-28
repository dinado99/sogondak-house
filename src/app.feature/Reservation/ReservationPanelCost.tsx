import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import costLow from '../../../public/images/reservation/비수기.jpeg';
import costMid from '../../../public/images/reservation/준성수기.jpeg';
import costHigh from '../../../public/images/reservation/성수기.jpeg';

// 요금표 이미지에 표기된 기간 기준
const SEASONS = [
  { name: '비수기', period: '11-4월', months: [11, 12, 1, 2, 3, 4], image: costLow },
  { name: '준성수기', period: '5-6월 · 9-10월', months: [5, 6, 9, 10], image: costMid },
  { name: '성수기', period: '7-8월', months: [7, 8], image: costHigh },
];

/** 한국 시간 기준 이번 달(1-12) */
const getCurrentMonthKST = () =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Seoul',
      month: 'numeric',
    }).format(new Date())
  );

const getCurrentSeasonIndex = () => {
  const month = getCurrentMonthKST();
  const idx = SEASONS.findIndex((season) => season.months.includes(month));
  return idx === -1 ? 0 : idx;
};

const ReservationPanelCost = () => {
  // 정적 페이지라 빌드 시점이 아닌 방문 시점의 달로 맞추기 위해 클라이언트에서 계산
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const idx = getCurrentSeasonIndex();
    setCurrentIdx(idx);
    setSelected(idx);
  }, []);

  const season = SEASONS[selected];

  return (
    <StyledWrapper>
      <div className="season-tabs" role="tablist">
        {SEASONS.map((item, idx) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={selected === idx}
            className={`season-tab ${selected === idx ? 'active' : ''}`}
            onClick={() => setSelected(idx)}
          >
            <span className="season-name">
              {item.name}
              {currentIdx === idx && <span className="season-now">이번 달</span>}
            </span>
            <span className="season-period">{item.period}</span>
          </button>
        ))}
      </div>
      <div className="season-image">
        <Image
          key={season.name}
          src={season.image}
          alt={`${season.name} 객실 요금`}
          sizes="(max-width: 880px) 100vw, 832px"
        />
      </div>
    </StyledWrapper>
  );
};

export default ReservationPanelCost;

const StyledWrapper = styled.div`
  width: 100%;

  .season-tabs {
    display: inline-flex;
    padding: 4px;
    margin-bottom: 20px;
    background: var(--color-stone);
    border-radius: 999px;

    @media (max-width: 420px) {
      display: flex;

      .season-tab {
        flex: 1;
        padding: 8px 6px;
      }
    }
  }

  .season-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 18px;
    border-radius: 999px;
    background: transparent;
    font-size: 13px;
    line-height: 1.3;
    color: var(--color-text);
    transition: background 200ms, color 200ms;

    .season-name {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .season-now {
      padding: 0 6px;
      border-radius: 999px;
      background: var(--color-main);
      color: #fff;
      font-size: 10px;
      line-height: 16px;
    }

    .season-period {
      font-size: 10px;
      color: var(--color-muted);
    }

    &.active {
      background: #fff;
      color: var(--color-main);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    }
  }

  .season-image {
    border: 1px solid var(--color-line);
    border-radius: 12px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;
