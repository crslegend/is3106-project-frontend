import React from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import Typography from "./Typography";
import image from "../assets/login4.jpg";
import { Button } from "@material-ui/core";

const PrivateRoute = ({ render, path, ...rest }) => {
  const newRender =
    Cookies.get("t1") && Cookies.get("t2")
      ? render
      : () => (
          <React.Fragment>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                // backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.4,
                zIndex: -1,
              }}
            >
              <img src={image} style={{ height: "100vh", width: "100vw" }} />
            </div>

            <Typography variant="h4" style={{ marginTop: "35vh" }}>
              401 Unauthorized
            </Typography>
            <Typography variant="h6">
              You have reached an unauthorized page
            </Typography>
            <br />
            <Button
              variant="outlined"
              size="large"
              component="a"
              href="/"
              style={{
                borderColor: "#000000",
              }}
            >
              Bring Me Back
            </Button>
          </React.Fragment>
        );
  return <Route render={newRender} path {...rest} />;
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
