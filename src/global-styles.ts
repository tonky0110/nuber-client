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
`;

export default GlobalStyle;
