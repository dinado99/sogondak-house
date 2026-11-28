import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import HeaderRoomModal from './HeaderRoomModal';
import Image from 'next/image';

const Header = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const roomMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // 드롭다운 바깥을 누르면 닫기 (모바일)
  useEffect(() => {
    if (!isOpenDropdown) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!roomMenuRef.current?.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpenDropdown]);

  // 페이지 이동 시 드롭다운 닫기
  useEffect(() => {
    setIsOpenDropdown(false);
  }, [router.asPath]);

  // 마우스는 hover 로 열고 닫음, 터치는 탭으로 토글
  const handlePointerEnter = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') setIsOpenDropdown(true);
  };
  const handlePointerLeave = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') setIsOpenDropdown(false);
  };

  const isActive = (path: string) =>
    path === '/' ? router.pathname === '/' : router.pathname.startsWith(path);

  return (
    <StyledWrapper>
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="소곤닥하우스 홈">
          <Image
            className="logo-mark"
            width={60}
            height={44}
            alt="소곤닥하우스"
            src="/images/common/logo-big.png"
            priority
          />
          <Image
            className="logo-letter"
            width={86}
            height={44}
            alt=""
            src="/images/common/logo-letter-black.png"
            priority
          />
        </Link>

        <nav className="menu">
          <Link href="/" className={`menu-item ${isActive('/') ? 'active' : ''}`}>
            HOME
          </Link>
          <Link
            href="/about"
            className={`menu-item ${isActive('/about') ? 'active' : ''}`}
          >
            ABOUT
          </Link>
          <div
            ref={roomMenuRef}
            className="room-menu"
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            <button
              type="button"
              className={`menu-item ${isActive('/room') ? 'active' : ''}`}
              aria-expanded={isOpenDropdown}
              onClick={() => setIsOpenDropdown((prev) => !prev)}
            >
              ROOM
            </button>
            {isOpenDropdown && (
              <div className="room-dropdown">
                <HeaderRoomModal handleOpenChange={setIsOpenDropdown} />
              </div>
            )}
          </div>
          <Link
            href="/reservation"
            className={`menu-item ${isActive('/reservation') ? 'active' : ''}`}
          >
            RESERVATION
          </Link>
        </nav>
      </div>
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--color-line);

  .header-inner {
    max-width: var(--content-width);
    margin: 0 auto;
    height: var(--header-height);
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 44px;

    img {
      width: auto;
      height: 100%;
      object-fit: contain;
    }

    .logo-mark {
      height: 40px;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .menu-item {
    position: relative;
    display: block;
    padding: 8px 12px;
    font-size: 13px;
    letter-spacing: 0.08em;
    color: var(--color-ink);
    background: none;
    cursor: pointer;
    transition: color 200ms;

    &::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 2px;
      height: 1.5px;
      background: var(--color-main);
      transform: scaleX(0);
      transition: transform 250ms ease;
    }

    @media (hover: hover) {
      &:hover {
        color: var(--color-main);
      }
    }

    &.active {
      color: var(--color-main);

      &::after {
        transform: scaleX(1);
      }
    }
  }

  .room-menu {
    position: relative;

    .room-dropdown {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 10px;
      z-index: 1050;
    }
  }

  @media (max-width: 768px) {
    --header-height: auto;

    .header-inner {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 10px 0 0;
    }

    .logo {
      justify-content: center;
      height: 36px;

      .logo-mark {
        height: 32px;
      }
    }

    .menu {
      justify-content: space-around;
      gap: 0;
      padding: 4px 4px 0;
    }

    .menu-item {
      font-size: 12px;
      padding: 10px 8px;
    }
  }
`;
