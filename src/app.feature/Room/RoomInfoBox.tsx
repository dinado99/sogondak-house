import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import SwiperPhoto from 'app.components/SwiperPhoto/SwiperPhoto';
import ImageSwiper from 'app.components/Image/ImageSwiper';
import { ObjectRoom, RoomOrder } from './ObjectRoom';

type TDetail = { label: string; value: React.ReactNode };

type TProps = {
  /** 슬라이드 key, 현재 객실 표시에 사용 (예: 101, 'common') */
  id: number | string;
  eyebrow: string;
  title: string | number;
  desc: React.ReactNode;
  details: TDetail[];
  photo: string[];
};

const RoomInfoBox: React.FC<TProps> = ({
  id,
  eyebrow,
  title,
  desc,
  details,
  photo,
}) => {
  return (
    <StyledWrapper>
      <div className="room-photo">
        <SwiperPhoto>
          {photo.map((item, idx) => (
            <SwiperSlide key={`room-${id}-image-${idx}`}>
              <ImageSwiper
                src={item}
                alt={`${id} 객실 사진 ${idx + 1}`}
                priority={idx === 0}
              />
            </SwiperSlide>
          ))}
        </SwiperPhoto>
      </div>

      <div className="room-info">
        <div className="room-eyebrow">{eyebrow}</div>
        <h1 className="room-title">{title}</h1>
        <p className="room-desc">{desc}</p>

        <dl className="room-details">
          {details.map((detail) => (
            <div className="room-detail" key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>

        <Link href="/reservation" className="room-cta">
          예약 안내 보기 <span aria-hidden>→</span>
        </Link>

        <div className="room-others">
          <div className="room-others-title">Other Rooms</div>
          <div className="room-others-list">
            {RoomOrder.map((number) => (
              <Link
                key={number}
                href={`/room/${number}`}
                className={`room-chip ${String(id) === String(number) ? 'active' : ''}`}
              >
                {number}
              </Link>
            ))}
            <Link
              href="/room/common"
              className={`room-chip ${id === 'common' ? 'active' : ''}`}
            >
              Common
            </Link>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default RoomInfoBox;

/** ObjectRoom 데이터를 RoomInfoBox props 로 변환 */
export const roomProps = (number: keyof typeof ObjectRoom): TProps => {
  const room = ObjectRoom[number];
  return {
    id: number,
    eyebrow: room.type,
    title: room.number,
    desc: room.desc,
    photo: room.photo,
    details: [
      { label: '이용 인원', value: room.people },
      { label: '기본 비품', value: room.basic },
      {
        label: '공용 비품',
        value: '정수기, 전자레인지, 토스트기, 커피포트, 각종 식기류.',
      },
    ],
  };
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;

  .room-photo {
    position: sticky;
    top: var(--header-height);
    flex: 1 1 50%;
    min-width: 0;
  }

  .room-info {
    flex: 1 1 50%;
    min-width: 0;
    max-width: 640px;
    padding: 80px 64px;
    display: flex;
    flex-direction: column;
    line-height: 1.8;
    color: var(--color-text);
    font-size: 14px;
  }

  .room-eyebrow {
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-main);
    margin-bottom: 12px;
  }

  .room-title {
    font-family: 'gothicBookMedium', 'gothicBook', sans-serif;
    font-size: 64px;
    line-height: 1.1;
    color: var(--color-ink);
    margin-bottom: 28px;
  }

  .room-desc {
    font-size: 15px;
    color: var(--color-ink);
    margin-bottom: 40px;
  }

  .room-details {
    border-top: 1px solid var(--color-line);
    margin-bottom: 40px;
  }

  .room-detail {
    display: grid;
    grid-template-columns: 88px 1fr;
    gap: 16px;
    padding: 18px 0;
    border-bottom: 1px solid var(--color-line);

    dt {
      font-weight: 600;
      color: var(--color-ink);
      white-space: nowrap;
    }
  }

  .room-cta {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    border-radius: 999px;
    background: var(--color-main);
    color: #fff;
    font-size: 14px;
    transition: opacity 200ms, transform 200ms;
    margin-bottom: 56px;

    &:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }
  }

  .room-others-title {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 12px;
  }

  .room-others-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .room-chip {
    padding: 6px 14px;
    border: 1px solid var(--color-line);
    border-radius: 999px;
    font-size: 13px;
    color: var(--color-ink);
    transition: border-color 150ms, color 150ms;

    &:hover {
      border-color: var(--color-main);
      color: var(--color-main);
    }

    &.active {
      background: var(--color-main);
      border-color: var(--color-main);
      color: #fff;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;

    .room-photo {
      position: static;
      width: 100%;
    }

    .room-info {
      max-width: none;
      width: 100%;
      padding: 48px 24px 24px;
    }

    .room-title {
      font-size: 48px;
    }
  }
`;
