import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";

const LandingPage = () => {
  return (
    <Fragment>
      <Navbar />
    </Fragment>
  );
};

export default withRoot(LandingPage);
