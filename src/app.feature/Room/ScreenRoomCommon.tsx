import React from 'react';
import RoomInfoBox from './RoomInfoBox';
import { CommonSpacePhotos } from './ObjectRoom';

const ScreenRoomCommon = () => {
  return (
    <RoomInfoBox
      id="common"
      eyebrow="Common"
      title="Common Space"
      photo={CommonSpacePhotos}
      desc={
        <>
          소곤닥하우스를 이용하는 모든 투숙객이 함께 사용하는 공용
          공간입니다. 이곳에서 간단한 조리와 취식이 가능합니다.
        </>
      }
      details={[
        { label: '이용 시간', value: '09:00 - 11:00 / 16:00 - 22:30' },
        {
          label: '공용 비품',
          value:
            '청소기, 정수기, 전자레인지, 토스트기, 커피포트, 각종 식기류.',
        },
        {
          label: '이용 안내',
          value: (
            <>
              휴게공간 이용 후 반드시 사용하신 식기 세척과 뒷정리
              부탁드립니다.
              <br />
              건물 소등시간인 10시 30분 이후에는 휴게공간 사용이 불가능합니다.
            </>
          ),
        },
      ]}
    />
  );
};

export default ScreenRoomCommon;
