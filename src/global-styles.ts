import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";

// tslint:disable-next-line
const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    input,
    button{
        &:focus,
        &:active{outline:none}
    }
    h1,h2,h3,h4,h5,h6{
        font-family: 'Maven Pro', sans-serif;
    }
`;

export default GlobalStyle;
