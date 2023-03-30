import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0 auto;
        height: 100vh;
        width: 100%;
        overflow-x: hidden;
        background-color: #353333;
        color: white;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`