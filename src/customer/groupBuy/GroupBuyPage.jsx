import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import GroupBuyBody from "./GroupBuyBody";

const GroupBuyPage = () => (
  <Fragment>
    <Navbar />
    <GroupBuyBody />
  </Fragment>
);

export default withRoot(GroupBuyPage);
