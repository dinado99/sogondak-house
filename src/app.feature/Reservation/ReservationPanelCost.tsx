import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type TRate = {
  room: number;
  capacity: string;
  /** [평일, 주말] */
  prices: Record<'low' | 'mid' | 'high', [number, number]>;
};

// 기존 요금표 이미지(비수기/준성수기/성수기.jpeg) 내용을 그대로 옮김
const RATES: TRate[] = [
  { room: 101, capacity: '1인실', prices: { low: [38000, 48000], mid: [48000, 58000], high: [58000, 68000] } },
  { room: 102, capacity: '2인실', prices: { low: [48000, 58000], mid: [58000, 68000], high: [68000, 78000] } },
  { room: 201, capacity: '2-4인실', prices: { low: [68000, 78000], mid: [83000, 93000], high: [98000, 108000] } },
  { room: 202, capacity: '2-3인실', prices: { low: [60000, 70000], mid: [75000, 85000], high: [90000, 100000] } },
  { room: 203, capacity: '2-4인실', prices: { low: [65000, 75000], mid: [80000, 90000], high: [95000, 105000] } },
  { room: 204, capacity: '2인실', prices: { low: [48000, 58000], mid: [58000, 68000], high: [68000, 78000] } },
];

const SEASONS = [
  { key: 'low', name: '비수기', period: '11-4월', months: [11, 12, 1, 2, 3, 4] },
  { key: 'mid', name: '준성수기', period: '5-6월 · 9-10월', months: [5, 6, 9, 10] },
  { key: 'high', name: '성수기', period: '7-8월', months: [7, 8] },
] as const;

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
  const idx = SEASONS.findIndex((season) =>
    (season.months as readonly number[]).includes(month)
  );
  return idx === -1 ? 0 : idx;
};

const formatPrice = (price: number) => price.toLocaleString('ko-KR');

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
            key={item.key}
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

      <table className="rate-table">
        <caption className="sr-only">
          {season.name}({season.period}) 객실 요금
        </caption>
        <thead>
          <tr>
            <th scope="col">객실</th>
            <th scope="col" className="price">평일</th>
            <th scope="col" className="price">주말</th>
          </tr>
        </thead>
        <tbody>
          {RATES.map((rate) => {
            const [weekday, weekend] = rate.prices[season.key];
            return (
              <tr key={rate.room}>
                <th scope="row">
                  <span className="room-number">{rate.room}</span>
                  <span className="room-capacity">{rate.capacity}</span>
                </th>
                <td className="price">{formatPrice(weekday)}</td>
                <td className="price">{formatPrice(weekend)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="rate-notes">
        <p>단위: 원 (KRW) · 1박 기준</p>
        <p>
          모든 객실은 기준 인원(1인 또는 2인) 가격이며,{' '}
          <b>1인 추가 시 1박 당 1만원</b>의 비용이 발생하며 침구류 세트, 수건
          등의 생활 비품이 추가로 제공됩니다.
        </p>
        <p className="rate-direct">
          해당 가격은 다이렉트 예약시 제공되는 가격입니다. 예약 플랫폼별 별도의
          수수료가 발생하니 이점 확인 후 예약 진행 부탁드립니다.
        </p>
      </div>
    </StyledWrapper>
  );
};

export default ReservationPanelCost;

const StyledWrapper = styled.div`
  width: 100%;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

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

  .rate-table {
    width: 100%;
    max-width: 560px;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;

    th,
    td {
      padding: 14px 8px;
      border-bottom: 1px solid var(--color-line);
      text-align: left;
      vertical-align: middle;
    }

    thead th {
      padding-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-ink);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.12em;
      color: var(--color-muted);
    }

    tbody th {
      font-weight: 400;
    }

    .price {
      width: 30%;
      text-align: right;
    }

    td.price {
      font-size: 15px;
      color: var(--color-ink);
    }

    .room-number {
      font-size: 16px;
      color: var(--color-ink);
      margin-right: 10px;
    }

    .room-capacity {
      font-size: 12px;
      color: var(--color-muted);
    }
  }

  .rate-notes {
    max-width: 560px;
    margin-top: 16px;
    font-size: 12px;
    line-height: 1.8;
    color: var(--color-muted);

    b {
      font-weight: 600;
      color: var(--color-text);
    }

    .rate-direct {
      margin-top: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      background: var(--color-main-soft);
      color: var(--color-ink);
    }
  }
`;
