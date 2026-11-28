import React from 'react';
import styled from 'styled-components';

/** 총 결제금액 대비 차감률(%) - 기존 환불 규정 그대로 */
const REFUND_RULES: { label: string; low: number; high: number }[] = [
  { label: '이용 10일 전까지', low: 0, high: 0 },
  { label: '이용 9일 전', low: 10, high: 10 },
  { label: '이용 8일 전', low: 20, high: 20 },
  { label: '이용 7일 전', low: 30, high: 30 },
  { label: '이용 6일 전', low: 40, high: 40 },
  { label: '이용 5일 전', low: 50, high: 50 },
  { label: '이용 4일 전', low: 60, high: 100 },
  { label: '이용 3일 전', low: 70, high: 100 },
  { label: '이용 2일 전', low: 80, high: 100 },
  { label: '이용 1일 전', low: 90, high: 100 },
  { label: '이용 당일', low: 100, high: 100 },
];

const NOTICES = [
  '환불은 입금자 확인 후 입금하신 분의 계좌 및 결제 카드로 환불됩니다.',
  '예약 변경시, 기존 예약을 취소 후 예약 하셔야 합니다. 임의로 예약을 변경해 드리는 경우는 재난재해 등에 준하는 사유가 있는 경우에 한합니다.',
  '천재지변으로 인한 당일 항공편/배편이 취소된 경우, 그에 상응한 증빙자료 제출 후, 당일 숙박료에 한하여 100% 환불이 가능합니다.',
];

const RefundCell: React.FC<{ deduction: number }> = ({ deduction }) => {
  const refund = 100 - deduction;
  const status = refund === 100 ? 'full' : refund === 0 ? 'none' : 'partial';

  return (
    <td className={`refund-cell ${status}`}>
      <span className="refund-text">
        {refund === 0 ? '환불 불가' : `${refund}% 환불`}
      </span>
      <span className="refund-bar" aria-hidden>
        <span style={{ width: `${refund}%` }} />
      </span>
    </td>
  );
};

const ReservationPanelReserve = () => {
  return (
    <StyledWrapper>
      <p className="reserve-lead">
        다음과 같이 환불제를 실시하고 있으니 참고하시기 바랍니다.
        <br />
        잘못 예약 하신 경우에도 아래의 환불규정에 포함되오니, 신중하게 예약을
        진행해 주시기 바랍니다.
      </p>

      <table className="refund-table">
        <thead>
          <tr>
            <th scope="col">취소 시점</th>
            <th scope="col">
              비수기
              <span className="th-sub">11-4월</span>
            </th>
            <th scope="col">
              준성수기 · 성수기
              <span className="th-sub">5-10월</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {REFUND_RULES.map((rule) => (
            <tr key={rule.label}>
              <th scope="row">{rule.label}</th>
              <RefundCell deduction={rule.low} />
              <RefundCell deduction={rule.high} />
            </tr>
          ))}
        </tbody>
      </table>
      <p className="refund-caption">
        * 환불 비율은 총 결제금액 기준입니다.
      </p>

      <ul className="notice-list">
        {NOTICES.map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </StyledWrapper>
  );
};

export default ReservationPanelReserve;

const StyledWrapper = styled.div`
  line-height: 1.8;

  .reserve-lead {
    margin-bottom: 24px;
  }

  .refund-table {
    width: 100%;
    max-width: 560px;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;

    th,
    td {
      padding: 11px 8px;
      border-bottom: 1px solid var(--color-line);
      text-align: left;
      vertical-align: middle;
      font-weight: 400;
    }

    thead th {
      padding-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-ink);
      font-size: 12px;
      color: var(--color-ink);
      line-height: 1.4;

      &:first-child {
        font-size: 11px;
        letter-spacing: 0.12em;
        color: var(--color-muted);
        vertical-align: bottom;
      }

      .th-sub {
        display: block;
        font-size: 10px;
        color: var(--color-muted);
      }
    }

    tbody th {
      font-size: 13px;
      color: var(--color-ink);
      white-space: nowrap;
    }
  }

  .refund-cell {
    width: 34%;

    .refund-text {
      display: block;
      font-size: 13px;
      line-height: 1.4;
    }

    .refund-bar {
      display: block;
      height: 3px;
      margin-top: 5px;
      max-width: 120px;
      border-radius: 999px;
      background: var(--color-line);
      overflow: hidden;

      span {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: var(--color-main);
      }
    }

    &.full .refund-text {
      color: var(--color-main);
      font-weight: 600;
    }

    &.partial .refund-text {
      color: var(--color-ink);
    }

    &.none .refund-text {
      color: var(--color-muted);
    }
  }

  .refund-caption {
    max-width: 560px;
    margin-top: 10px;
    font-size: 12px;
    color: var(--color-muted);
  }

  .notice-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 28px;
    padding: 18px 20px;
    border-radius: 12px;
    background: var(--color-stone);

    li {
      position: relative;
      padding-left: 14px;
      font-size: 13px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.8em;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--color-main);
      }
    }
  }
`;
