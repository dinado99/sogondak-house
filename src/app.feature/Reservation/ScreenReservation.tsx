import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Collapse } from 'antd';
import ReservationPanelCost from './ReservationPanelCost';
import ReservationPanelRoom from './ReservationPanelRoom';
import ReservationPanelReserve from './ReservationPanelReserve';
import useWindowSize from '../../app.hook/useWindowResize';

const { Panel } = Collapse;

const ScreenReservation = () => {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (width === undefined) return;
    if (width > 1024) setIsMobile(false);
    else setIsMobile(true);
  }, [width]);

  return (
    <StyledWrapper>
      <div className="reservation-head">
        <div className="eyebrow">Reservation</div>
        <h1 className="title">예약 안내</h1>
        <p className="lead">
          아래 채널에서 예약 및 문의하실 수 있습니다.
          <br />
          예약 전 요금과 이용 규정을 꼭 확인해 주세요.
        </p>
        <div className="platform-container">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              className="platform"
              href={platform.href}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={platform.icon}
                alt=""
                width={22}
                height={22}
                className="platform-icon"
              />
              {platform.name}
            </a>
          ))}
        </div>
      </div>

      <Collapse
        ghost
        accordion={isMobile}
        defaultActiveKey={['1']}
        expandIconPosition="end"
      >
        <Panel key="1" header="객실 요금 안내">
          <ReservationPanelCost />
        </Panel>
        <Panel key="2" header="숙소 이용 안내">
          <ReservationPanelRoom />
        </Panel>
        <Panel key="3" header="예약 취소, 변경 및 환불 규정">
          <ReservationPanelReserve />
        </Panel>
      </Collapse>
    </StyledWrapper>
  );
};

export default ScreenReservation;

const PLATFORMS = [
  {
    name: '네이버 예약',
    icon: '/images/reservation/naver.jpeg',
    href: 'https://map.naver.com/v5/entry/place/1659523223?lng=126.6633064&lat=33.542845&placePath=%2Froom&c=15,0,0,0,dh',
  },
  {
    name: '에어비앤비',
    icon: '/images/reservation/airbnb.jpeg',
    href: 'https://www.airbnb.co.kr/users/300970932/listings',
  },
  {
    name: '인스타그램',
    icon: '/images/reservation/instagram.jpeg',
    href: 'https://www.instagram.com/sogondak_house/',
  },
];

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 80px 24px 40px;

  .reservation-head {
    text-align: center;
    margin-bottom: 56px;
  }

  .eyebrow {
    font-size: 12px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--color-main);
    margin-bottom: 12px;
  }

  .title {
    font-size: 30px;
    color: var(--color-ink);
    margin-bottom: 16px;
  }

  .lead {
    font-size: 14px;
    line-height: 1.9;
    color: var(--color-text);
    margin-bottom: 28px;
  }

  .platform-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .platform {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px 10px 12px;
    border: 1px solid var(--color-line);
    border-radius: 999px;
    font-size: 14px;
    color: var(--color-ink);
    background: #fff;
    transition: border-color 200ms, transform 200ms;

    &:hover {
      border-color: var(--color-main);
      transform: translateY(-1px);
    }

    .platform-icon {
      width: 22px;
      height: 22px;
      border-radius: 6px;
    }
  }

  .ant-collapse {
    border-top: 1px solid var(--color-line);
    border-radius: 0;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: 1px solid var(--color-line);
    border-radius: 0;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    align-items: center;
    padding: 24px 4px;

    .ant-collapse-header-text {
      font-weight: 600;
      font-size: 17px;
      color: var(--color-ink);
      transition: color 200ms;
    }
  }

  .ant-collapse > .ant-collapse-item-active > .ant-collapse-header {
    .ant-collapse-header-text {
      color: var(--color-main);
    }
  }

  .ant-collapse-content-box {
    padding: 0 4px 32px !important;
    font-size: 14px;
    color: var(--color-text);
  }

  @media (max-width: 640px) {
    padding: 48px 16px 24px;

    .title {
      font-size: 24px;
    }

    .ant-collapse > .ant-collapse-item > .ant-collapse-header {
      padding: 20px 4px;

      .ant-collapse-header-text {
        font-size: 15px;
      }
    }
  }
`;
