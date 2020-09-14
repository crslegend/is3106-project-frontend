import React from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ render, path, ...rest }) => {
  const newRender = Cookies.get("t1") && Cookies.get("t2") ? render : () => null;
  return <Route render={newRender} path {...rest} />;
};

GroupBuyBody.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
