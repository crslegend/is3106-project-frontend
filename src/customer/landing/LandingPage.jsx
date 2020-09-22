import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import LandingBody from "./LandingBody";

const LandingPage = (props) => (
  <Fragment>
    <Navbar />
    <LandingBody {...props} />
  </Fragment>
);

export default withRoot(LandingPage);
