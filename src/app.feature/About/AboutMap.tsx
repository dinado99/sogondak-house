import React, { useRef } from 'react';
import Script from 'next/script';
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Section from 'app.components/Section/Section';

declare let naver: any;

const NAVER_MAP_SRC = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.CLIENT_ID}`;

const AboutMap = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);

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
      const url =
        'https://map.naver.com/v5/entry/place/1659523223?c=20,0,0,0,dh';
      window.open(url);
    });
  };

  return (
    <Section eyebrow="Location" title="오시는 길">
      <StyledWrapper>
        <Script
          src={NAVER_MAP_SRC}
          strategy="afterInteractive"
          onReady={initMap}
        />
        <div id="map"></div>
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
