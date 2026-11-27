import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledWrapper>
      <div className="footer-inner">
        <Image
          className="footer-logo"
          src="/images/common/logo-letter-black.png"
          alt="소곤닥하우스"
          width={78}
          height={40}
        />

        <div className="footer-info">
          <div className="footer-info-wrap">
            <span>소곤닥 하우스</span>
            <span>제주시 조천읍 신북로 497</span>
            <a href="tel:0647436003">064) 743 - 6003</a>
          </div>
          <div className="footer-info-wrap">
            <span>사업자등록번호 : 403 - 51 - 00410</span>
          </div>
          <div className="footer-info-wrap">
            <span>대표명 : 현재호</span>
            <span>개인정보관리책임자 : 김솔아</span>
          </div>
        </div>

        <a
          className="footer-insta"
          href="https://www.instagram.com/sogondak_house/"
          target="_blank"
          rel="noreferrer"
        >
          @sogondak_house
        </a>
      </div>
    </StyledWrapper>
  );
};

export default Footer;

const StyledWrapper = styled.footer`
  margin-top: 80px;
  background: var(--color-stone);
  border-top: 1px solid var(--color-line);

  .footer-inner {
    max-width: var(--content-width);
    margin: 0 auto;
    padding: 48px 24px 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  .footer-logo {
    width: auto;
    height: 36px;
    opacity: 0.8;
  }

  .footer-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11px;
    line-height: 1.6;
    color: var(--color-muted);
  }

  .footer-info-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > * {
      padding: 0 8px;
      border-right: 1px solid #d6d1c8;
      color: inherit;

      &:last-child {
        border-right: none;
      }
    }
  }

  .footer-insta {
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--color-text);
    transition: color 200ms;

    &:hover {
      color: var(--color-main);
    }
  }
`;
