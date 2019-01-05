import PropTypes from "prop-types";
import React from "react";

interface IProps {
  isLoggedIn: boolean;
}
// React.SFC = Stateless Functional Component
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) =>
  isLoggedIn ? <span>you are in</span> : <span>you are out</span>;

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
export default AppPresenter;
