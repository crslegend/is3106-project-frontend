import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import LandingBody from "../views/LandingBody";

const LandingPage = (props) => (
  <Fragment>
    <Navbar />
    <LandingBody {...props} />
  </Fragment>
);

export default withRoot(LandingPage);
