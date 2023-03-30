import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0 auto;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #353333;
        color: white;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`