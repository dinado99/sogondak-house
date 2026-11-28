import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Section from 'app.components/Section/Section';

declare let naver: any;

// 네이버 클라우드 Maps 신규 인증 방식 (ncpClientId -> ncpKeyId, oapi.map.naver.com)
// CLIENT_ID 에는 네이버 클라우드 콘솔 > Maps > Application 의 Client ID(Key ID)를 넣는다.
const NAVER_MAP_SRC = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.CLIENT_ID}`;

const NAVER_PLACE_URL =
  'https://map.naver.com/v5/entry/place/1659523223?c=20,0,0,0,dh';

const AboutMap = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [mapFailed, setMapFailed] = useState(!process.env.CLIENT_ID);

  // 키가 잘못됐거나 도메인이 등록되지 않으면 네이버가 이 함수를 호출한다
  useEffect(() => {
    (window as any).navermap_authFailure = () => setMapFailed(true);
    return () => {
      delete (window as any).navermap_authFailure;
    };
  }, []);

  const handleCopyAddress = () => {
    message.success('주소가 복사되었습니다!');
    navigator.clipboard.writeText(
      '제주특별자치도 제주시 조천읍 신북로497, 소곤닥하우스'
    );
  };

  // 스크립트가 로드된 뒤(그리고 이미 로드된 상태로 페이지에 다시 들어올 때마다) 실행
  const initMap = () => {
    if (typeof naver === 'undefined' || !naver.maps) return;

    const latLng = new naver.maps.LatLng(33.542845, 126.6633064);

    mapRef.current = new naver.maps.Map('map', {
      center: latLng,
      zoom: 15, //지도의 초기 줌 레벨
    });

    const marker = new naver.maps.Marker({
      position: latLng,
      map: mapRef.current,
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      window.open(NAVER_PLACE_URL);
    });
  };

  return (
    <Section eyebrow="Location" title="오시는 길">
      <StyledWrapper>
        {process.env.CLIENT_ID && (
          <Script
            src={NAVER_MAP_SRC}
            strategy="afterInteractive"
            onReady={initMap}
            onError={() => setMapFailed(true)}
          />
        )}
        {mapFailed ? (
          <a
            className="map-fallback"
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="map-fallback-title">소곤닥하우스</span>
            <span className="map-fallback-link">네이버 지도에서 보기 →</span>
          </a>
        ) : (
          <div id="map"></div>
        )}
        <button type="button" className="address" onClick={handleCopyAddress}>
          <span>제주특별자치도 제주시 조천읍 신북로497, 소곤닥하우스</span>
          <CopyOutlined className="copy-button" />
        </button>
      </StyledWrapper>
    </Section>
  );
};

export default AboutMap;

const StyledWrapper = styled.div`
  width: 100%;

  #map {
    width: 100%;
    height: 360px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-stone);
    margin-bottom: 12px;
  }

  .map-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 200px;
    margin-bottom: 12px;
    border-radius: 12px;
    background: var(--color-stone);
    color: var(--color-ink);
    transition: background 200ms;

    &:hover {
      background: var(--color-main-soft);
    }

    .map-fallback-title {
      font-size: 16px;
    }

    .map-fallback-link {
      font-size: 13px;
      color: var(--color-main);
    }
  }

  .address {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    background: none;
    font-size: 14px;
    color: var(--color-ink);
    text-align: left;
    cursor: pointer;
    transition: color 200ms;

    .copy-button {
      color: var(--color-main);
    }

    &:hover {
      color: var(--color-main);
    }
  }
`;
