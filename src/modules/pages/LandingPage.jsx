import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import LandingBody from "../views/LandingBody";

const LandingPage = () => (
  <Fragment>
    <Navbar />
    <LandingBody />
  </Fragment>
);

export default withRoot(LandingPage);
