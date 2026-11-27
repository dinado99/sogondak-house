import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import Image from 'next/image';
import costLow from '../../../public/images/reservation/비수기.jpeg';
import costMid from '../../../public/images/reservation/준성수기.jpeg';
import costHigh from '../../../public/images/reservation/성수기.jpeg';

const { Panel } = Collapse;

type TProps = {
  isMobile: boolean;
};

const ReservationPanelCost: React.FC<TProps> = ({ isMobile }) => {
  return (
    <StyledWrapper>
      <Collapse ghost accordion={isMobile}>
        <Panel key="1" header="비수기">
          <Image src={costLow} alt="비수기 객실 요금" sizes="(max-width: 800px) 100vw, 800px" />
        </Panel>
        <Panel key="2" header="준성수기">
          <Image src={costMid} alt="준성수기 객실 요금" sizes="(max-width: 800px) 100vw, 800px" />
        </Panel>
        <Panel key="3" header="성수기">
          <Image src={costHigh} alt="성수기 객실 요금" sizes="(max-width: 800px) 100vw, 800px" />
        </Panel>
      </Collapse>
    </StyledWrapper>
  );
};

export default ReservationPanelCost;

const StyledWrapper = styled.div`
  width: 100%;

  .ant-collapse-header[aria-expanded='true'] {
    color: var(--color-main);
  }

  .ant-collapse-header-text {
    font-weight: 400 !important;
  }

  img {
    max-width: 800px;
    width: 100%;
    height: auto;
  }
`;
