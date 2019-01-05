import React, { Fragment } from "react";
import { graphql } from "react-apollo";
import reset from "styled-reset";
import theme from "../../theme";
import { createGlobalStyle, ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

// tslint:disable-next-line
const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </Fragment>
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
