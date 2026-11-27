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

  // 마우스는 hover 로 열고 닫음, 터치는 탭으로 토글
  const handlePointerEnter = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') setIsOpenDropdown(true);
  };
  const handlePointerLeave = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') setIsOpenDropdown(false);
  };

  return (
    <StyledWrapper>
      <div className="header-top">
        <Link href="/" className="logo-left">
          <Image
            width={99.17}
            height={72}
            alt="소곤닥하우스"
            priority
            src="/images/common/logo-big.png"
          />
        </Link>
        <div className="logo-right">
          <Image
            width={101.81}
            height={52}
            alt="소곤닥하우스"
            priority
            src="/images/common/logo-letter-black.png"
          />
        </div>
      </div>

      <div className="header-bottom">
        <div
          onClick={() => router.push('/')}
          className={`menu-item ${router.pathname === '/'}`}
        >
          HOME
        </div>
        <div
          onClick={() => router.push('/about')}
          className={`menu-item ${router.pathname === '/about'}`}
        >
          ABOUT
        </div>
        <div
          ref={roomMenuRef}
          className="room-menu"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className={`menu-item ${router.pathname.includes('room')}`}
            onClick={() => setIsOpenDropdown((prev) => !prev)}
          >
            ROOM
          </div>
          {isOpenDropdown && (
            <div className="room-dropdown">
              <HeaderRoomModal handleOpenChange={setIsOpenDropdown} />
            </div>
          )}
        </div>
        <Link
          href="/reservation"
          className={`menu-item ${router.pathname === '/reservation'}`}
        >
          RESERVATION
        </Link>
      </div>
    </StyledWrapper>
  );
};

export default Header;

const StyledWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;

  .room-menu {
    position: relative;

    .room-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding-top: 4px;
      z-index: 1050;
    }
  }

  .header-bottom {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    background-color: white;
    transition: 200ms;

    @media (max-width: 425px) {
      padding: 0 12px;
    }

    .menu-item {
      position: relative;
      transition: 300ms;
      font-size: 13px;
      color: var(--color-main);
      cursor: pointer;
      padding: 4px 8px;
      display: flex;
      text-align: center;
      border-bottom: 1.5px solid transparent;

      &.true {
        border-bottom: 1.5px solid var(--color-main);
      }

      @media (hover: hover) {
        &:hover {
          color: var(--color-main-hover);
        }
      }

      &:hover {
        .room-hover-modal {
          opacity: 1;
        }
      }
    }
  }

  .header-top {
    width: 100%;
    background-color: white;
    display: flex;
    height: 72px;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;

    .logo-left {
      height: 100%;
      text-align: center;
      width: auto;

      img {
        width: auto;
        height: 100%;
        object-fit: contain;
      }
    }

    .logo-right {
      height: 100%;
      width: auto;
      padding: 10px 0;

      img {
        width: auto;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;
