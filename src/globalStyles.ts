import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --error: #DA1E28;
        --sucess: #24A148;
        --background: #8D8D8D;
        --text-header: #FFFFFF;
        --text: #161616;
        --shape: #0F62FE;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        
        @media (max-width: 720px) {
            font-size: 87.5%;
        }

    }

    body {
        overflow: hidden;
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;