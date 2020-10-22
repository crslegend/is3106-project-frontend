import React from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const PrivateRoute = ({ render, path, ...rest }) => {
  const newRender =
    Cookies.get("t1") && Cookies.get("t2") ? render : () => null;
  return <Route render={newRender} path {...rest} />;
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
