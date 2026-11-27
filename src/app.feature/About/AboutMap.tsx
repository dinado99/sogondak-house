import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';

declare let naver: any;

const NAVER_PLACE_URL =
  'https://map.naver.com/v5/entry/place/1659523223?c=20,0,0,0,dh';

const AboutMap = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [mapFailed, setMapFailed] = useState(false);

  const handleCopyAddress = () => {
    message.success('주소가 복사되었습니다!');
    navigator.clipboard.writeText(
      '제주특별자치도 제주시 조천읍 신북로497, 소곤닥하우스'
    );
  };

  useEffect(() => {
    // 키가 잘못됐거나 도메인이 등록되지 않으면 네이버가 이 함수를 호출한다
    (window as any).navermap_authFailure = () => setMapFailed(true);

    // 스크립트를 불러오지 못한 경우 페이지가 깨지지 않도록 대체 화면 표시
    if (typeof naver === 'undefined' || !naver.maps) {
      setMapFailed(true);
      return;
    }

    const latLng = new naver.maps.LatLng(33.542845, 126.6633064);

    mapRef.current = new naver.maps.Map('map', {
      center: latLng,
      zoom: 15, //지도의 초기 줌 레벨
      // draggable: false,
    });

    let marker = new naver.maps.Marker({
      position: latLng,
      map: mapRef.current,
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      window.open(NAVER_PLACE_URL);
    });
  }, []);

  return (
    <StyledWrapper>
      {mapFailed ? (
        <a
          className="map-fallback"
          href={NAVER_PLACE_URL}
          target="_blank"
          rel="noreferrer"
        >
          네이버 지도에서 보기 →
        </a>
      ) : (
        <div id="map"></div>
      )}
      <div className="address">
        <div>제주특별자치도 제주시 조천읍 신북로497, 소곤닥하우스</div>
        <CopyOutlined onClick={handleCopyAddress} className="copy-button" />
      </div>
    </StyledWrapper>
  );
};

export default AboutMap;

const StyledWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }

  .about-content {
    padding: 80px;
  }

  .map-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    margin-bottom: 8px;
    background: #f5f5f5;
    color: var(--color-main);
    font-size: 14px;
  }

  #map {
    width: 100%;
    height: 400px;
    margin-bottom: 8px;
  }

  .address {
    font-family: 'Noto Sans KR';
    color: var(--color-main);
    font-size: 13px;
    text-align: center;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .copy-button {
      cursor: pointer;
    }
  }
`;
