import React from 'react';
import styled from 'styled-components';

type TProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
};

/** About/Reservation 공통 섹션: 왼쪽 제목, 오른쪽 내용 */
const Section: React.FC<TProps> = ({ eyebrow, title, children }) => (
  <StyledSection>
    <div className="section-heading">
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
    </div>
    <div className="section-body">{children}</div>
  </StyledSection>
);

export default Section;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  padding: 56px 0;
  border-top: 1px solid var(--color-line);

  .section-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-main);
    margin-bottom: 8px;
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-ink);
  }

  .section-body {
    min-width: 0;
    font-size: 14px;
    line-height: 1.9;
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 40px 0;
  }
`;
