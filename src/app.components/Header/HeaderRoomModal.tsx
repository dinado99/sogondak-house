import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

type TProps = {
  handleOpenChange: (flag: boolean) => void;
};

const ROOM_GROUPS = [
  { title: 'Single', rooms: ['101'] },
  { title: 'Double', rooms: ['102', '204'] },
  { title: 'Deluxe', rooms: ['201', '202', '203'] },
];

const HeaderRoomModal: React.FC<TProps> = ({ handleOpenChange }) => {
  const close = () => handleOpenChange(false);

  return (
    <StyledWrapper
      className="room-hover-modal"
      onClick={(event) => event.stopPropagation()}
    >
      {ROOM_GROUPS.map((group) => (
        <div className="room-group" key={group.title}>
          <div className="room-group-title">{group.title}</div>
          <div className="room-group-items">
            {group.rooms.map((room) => (
              <Link
                key={room}
                href={`/room/${room}`}
                className="room-link"
                onClick={close}
              >
                {room}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <Link href="/room/common" className="room-common" onClick={close}>
        Common Space
      </Link>
    </StyledWrapper>
  );
};

export default HeaderRoomModal;

const StyledWrapper = styled.div`
  min-width: 220px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--color-line);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: default;
  font-family: 'gothicBook';
  animation: dropdownIn 180ms ease;

  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .room-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .room-group-title {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .room-group-items {
    display: flex;
    gap: 6px;
  }

  .room-link {
    display: inline-block;
    min-width: 44px;
    padding: 6px 8px;
    text-align: center;
    font-size: 14px;
    color: var(--color-ink);
    border-radius: 8px;
    transition: background 150ms, color 150ms;

    &:hover {
      background: var(--color-main-soft);
      color: var(--color-main);
    }
  }

  .room-common {
    padding-top: 14px;
    border-top: 1px solid var(--color-line);
    font-size: 13px;
    text-align: center;
    color: var(--color-ink);
    letter-spacing: 0.04em;
    transition: color 150ms;

    &:hover {
      color: var(--color-main);
    }
  }
`;
