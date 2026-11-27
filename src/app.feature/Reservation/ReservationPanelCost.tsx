import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import costLow from '../../../public/images/reservation/비수기.jpeg';
import costMid from '../../../public/images/reservation/준성수기.jpeg';
import costHigh from '../../../public/images/reservation/성수기.jpeg';

const SEASONS = [
  { name: '비수기', image: costLow },
  { name: '준성수기', image: costMid },
  { name: '성수기', image: costHigh },
];

const ReservationPanelCost = () => {
  const [selected, setSelected] = useState(0);
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
            {item.name}
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
  }

  .season-tab {
    padding: 8px 18px;
    border-radius: 999px;
    background: transparent;
    font-size: 13px;
    color: var(--color-text);
    transition: background 200ms, color 200ms;

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
