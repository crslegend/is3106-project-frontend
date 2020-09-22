import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import CardDetailBody from "./CardDetailBody";

const CardDetailPage = () => (
  <Fragment>
    <Navbar />
    <CardDetailBody />
  </Fragment>
);

export default withRoot(CardDetailPage);
