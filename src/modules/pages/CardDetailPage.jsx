import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import CardDetailBody from "../views/CardDetailBody";

const CardDetailPage = () => (
  <Fragment>
    <Navbar />
    <CardDetailBody />
  </Fragment>
);

export default withRoot(CardDetailPage);
