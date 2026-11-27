import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import SwiperPhoto from 'app.components/SwiperPhoto/SwiperPhoto';
import ImageSwiper from 'app.components/Image/ImageSwiper';
import {
  CommonSpacePhotos,
  ObjectRoom,
  RoomOrder,
} from 'app.feature/Room/ObjectRoom';

const ArrImage = [
  'https://velog.velcdn.com/images/wlsdk0313/post/7ceaa03b-448c-492a-8cd2-273265cd9e30/image.jpg',
  'https://velog.velcdn.com/images/wlsdk0313/post/92fa3814-fb46-4462-a940-fe43120e17af/image.jpg',
  'https://velog.velcdn.com/images/wlsdk0313/post/6798476a-cfba-4e5a-86f7-c429822aaaf3/image.jpg',
  'https://velog.velcdn.com/images/wlsdk0313/post/b86158e9-1bb8-4517-bed7-7df6173e8998/image.jpg',
  'https://velog.velcdn.com/images/wlsdk0313/post/19586d6d-f155-49c1-845f-8ecbb7953b3a/image.jpg',
  'https://velog.velcdn.com/images/wlsdk0313/post/ecc371f6-9f7f-48c6-948d-f209ab29d292/image.JPG',
];

const RoomCards = RoomOrder.map((number) => ({
  href: `/room/${number}`,
  label: ObjectRoom[number].type,
  title: String(number),
  people: ObjectRoom[number].people,
  photo: ObjectRoom[number].photo[0],
}));

const ScreenHome = () => {
  return (
    <StyledWrapper>
      <section className="hero">
        <div className="hero-photo">
          <SwiperPhoto>
            {ArrImage.map((item, idx) => (
              <SwiperSlide key={`main-image-${idx}`}>
                <ImageSwiper
                  src={item}
                  alt={`소곤닥하우스 사진 ${idx + 1}`}
                  priority={idx === 0}
                />
              </SwiperSlide>
            ))}
          </SwiperPhoto>
        </div>

        <div className="hero-text">
          <div className="eyebrow">Hamdeok · Jeju</div>
          <h1 className="hero-title">소곤닥하우스</h1>

          <div className="description">
            <p>
              아름다운 섬 제주 동쪽, <br className="mobile-br" />
              변하는 계절에 맞춰 새로운 옷을 입는 서우봉과{' '}
              <br className="mobile-br" />
              반짝거리는 함덕해변.
              <br />
              나무 한 그루를 감싼 소담스러운 돌집,{' '}
              <br className="mobile-br" />
              소곤닥하우스입니다.
            </p>
            <p>
              증조할머니가 사시던 집터에 <br className="mobile-br" />
              아버지가 건축하신 소곤닥하우스는 <br />
              오래된 옛집의 기억과 투숙객분들의 추억을{' '}
              <br className="mobile-br" />
              켜켜이 소중하게 쌓아가고 있습니다.
            </p>
            <p>
              바쁜 일상은 잠시 잊고, <br className="mobile-br" />
              이곳에서 안온한 시간을 보내시길 바랍니다.
            </p>
          </div>

          <div className="hero-actions">
            <a href="#rooms" className="button primary">
              객실 둘러보기
            </a>
            <Link href="/reservation" className="button ghost">
              예약 안내
            </Link>
          </div>
        </div>
      </section>

      <section className="info-band">
        <div className="info-item">
          <span className="info-label">Check-in</span>
          <span className="info-value">16:00</span>
        </div>
        <div className="info-item">
          <span className="info-label">Check-out</span>
          <span className="info-value">11:00</span>
        </div>
        <Link href="/about" className="info-item link">
          <span className="info-label">Location</span>
          <span className="info-value small">제주시 조천읍 신북로 497 →</span>
        </Link>
      </section>

      <section className="rooms" id="rooms">
        <div className="section-head">
          <div className="eyebrow">Rooms</div>
          <h2 className="section-title">객실 안내</h2>
        </div>
        <div className="room-grid">
          {RoomCards.map((room) => (
            <Link key={room.href} href={room.href} className="room-card">
              <div className="room-card-photo">
                <Image
                  src={room.photo}
                  alt={`${room.title} 객실`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1120px) 33vw, 360px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="room-card-label">{room.label}</div>
              <div className="room-card-title">{room.title}</div>
              <div className="room-card-people">{room.people}</div>
            </Link>
          ))}
        </div>

        <Link href="/room/common" className="common-card">
          <div className="common-card-photo">
            <Image
              src={CommonSpacePhotos[0]}
              alt="공용 공간"
              fill
              sizes="(max-width: 640px) 100vw, 560px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="common-card-text">
            <div className="room-card-label">Common</div>
            <div className="room-card-title">Common Space</div>
            <p>
              모든 투숙객이 함께 사용하는 공용 공간입니다.
              <br />
              간단한 조리와 취식이 가능합니다.
            </p>
            <span className="common-card-more">자세히 보기 →</span>
          </div>
        </Link>
      </section>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .eyebrow {
    font-size: 12px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--color-main);
    margin-bottom: 14px;
  }

  /* ---------- Hero ---------- */
  .hero {
    display: flex;
    align-items: stretch;
  }

  .hero-photo {
    flex: 1 1 50%;
    min-width: 0;
  }

  .hero-text {
    flex: 1 1 50%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 48px;
    background: var(--color-stone);
  }

  .hero-title {
    font-size: 34px;
    letter-spacing: 0.06em;
    color: var(--color-ink);
    margin-bottom: 40px;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 28px;
    font-size: 14px;
    line-height: 2;
    color: var(--color-text);
    margin-bottom: 48px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 140px;
    padding: 13px 24px;
    border-radius: 999px;
    font-size: 14px;
    transition: opacity 200ms, transform 200ms, background 200ms;

    &:hover {
      transform: translateY(-1px);
    }

    &.primary {
      background: var(--color-main);
      color: #fff;

      &:hover {
        opacity: 0.88;
      }
    }

    &.ghost {
      border: 1px solid var(--color-ink);
      color: var(--color-ink);

      &:hover {
        background: var(--color-ink);
        color: #fff;
      }
    }
  }

  /* ---------- Info band ---------- */
  .info-band {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    max-width: var(--content-width);
    margin: 0 auto;
    border-bottom: 1px solid var(--color-line);
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 32px 24px;
    border-right: 1px solid var(--color-line);

    &:last-child {
      border-right: none;
    }

    &.link {
      color: inherit;
      transition: color 200ms;

      &:hover {
        color: var(--color-main);
      }
    }
  }

  .info-label {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .info-value {
    font-size: 24px;
    color: var(--color-ink);

    &.small {
      font-size: 15px;
      line-height: 36px;
      color: inherit;
    }
  }

  /* ---------- Rooms ---------- */
  .rooms {
    max-width: var(--content-width);
    margin: 0 auto;
    padding: 96px 24px 40px;
    scroll-margin-top: var(--header-height);
  }

  .section-head {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-title {
    font-size: 26px;
    color: var(--color-ink);
  }

  .room-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 24px;
  }

  .room-card {
    color: var(--color-ink);

    &:hover .room-card-photo img {
      transform: scale(1.04);
    }

    &:hover .room-card-title {
      color: var(--color-main);
    }
  }

  .room-card-photo {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: 6px;
    background: var(--color-stone);
    margin-bottom: 16px;

    img {
      transition: transform 600ms ease;
    }
  }

  .room-card-label {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 4px;
  }

  .room-card-title {
    font-size: 22px;
    margin-bottom: 4px;
    transition: color 200ms;
  }

  .room-card-people {
    font-size: 13px;
    color: var(--color-text);
  }

  .common-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 56px;
    background: var(--color-stone);
    border-radius: 6px;
    overflow: hidden;
    color: var(--color-ink);

    &:hover .common-card-photo img {
      transform: scale(1.04);
    }

    &:hover .common-card-more {
      color: var(--color-main);
    }
  }

  .common-card-photo {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;

    img {
      transition: transform 600ms ease;
    }
  }

  .common-card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 48px;

    .room-card-title {
      margin-bottom: 16px;
    }

    p {
      font-size: 14px;
      line-height: 1.9;
      color: var(--color-text);
      margin-bottom: 24px;
    }
  }

  .common-card-more {
    font-size: 13px;
    transition: color 200ms;
  }

  @media (min-width: 768px) {
    .mobile-br {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    .hero {
      flex-direction: column;
    }

    .hero-text {
      padding: 64px 24px;
    }

    .room-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px 16px;
    }
  }

  @media (max-width: 640px) {
    .hero-title {
      font-size: 28px;
      margin-bottom: 32px;
    }

    .description {
      font-size: 13px;
    }

    .info-band {
      grid-template-columns: 1fr 1fr;
    }

    .info-item {
      padding: 24px 20px;

      &:nth-child(2) {
        border-right: none;
      }

      &.link {
        grid-column: 1 / -1;
        border-top: 1px solid var(--color-line);
      }
    }

    .info-value {
      font-size: 20px;
    }

    .rooms {
      padding: 64px 16px 24px;
    }

    .room-card-title {
      font-size: 18px;
    }

    .common-card {
      grid-template-columns: 1fr;
      margin-top: 40px;
    }

    .common-card-text {
      padding: 28px 24px 32px;
    }
  }
`;

export default ScreenHome;
