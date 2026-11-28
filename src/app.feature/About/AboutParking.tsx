import React from 'react';
import Section from 'app.components/Section/Section';

const AboutParking = () => {
  return (
    <Section eyebrow="Parking" title="주차 안내">
      <p>
        건물 1층 카페 {`'`}호다{`'`} 앞 주차장에 총 2대의 차량 주차가
        가능합니다.
      </p>
      <p>
        주차공간이 없을 경우에 전화 주시면 유선상으로 주차장 안내해 드리고
        있습니다.
      </p>
    </Section>
  );
};

export default AboutParking;
