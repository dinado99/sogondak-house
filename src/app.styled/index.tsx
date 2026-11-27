import { createGlobalStyle } from 'styled-components';
import Reset from './resetCss';

export const GlobalStyle = createGlobalStyle`
    :root {
        --color-main: #00a063;
        --color-main-hover: #00a06347;
        --color-main-soft: #e8f5ef;
        --color-sub: #628AED;
        --color-white-hover: #ffffffa1;

        --color-ink: #222222;
        --color-text: #555555;
        --color-muted: #8c8c8c;
        --color-line: #ebe7e0;
        --color-stone: #f7f5f1;

        --header-height: 72px;
        --content-width: 1120px;
    }

    body {
        width: 100%;
        color: var(--color-ink);
        background: #ffffff;
        -webkit-font-smoothing: antialiased;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    ${Reset};
`;
