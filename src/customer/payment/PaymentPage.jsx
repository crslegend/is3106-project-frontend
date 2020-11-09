import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import PaymentBody from "./PaymentBody";

const PaymentPage = () => (
  <Fragment>
    <Navbar />
    <PaymentBody />
  </Fragment>
);

export default withRoot(PaymentPage);
