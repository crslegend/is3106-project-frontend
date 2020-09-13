import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import GroupBuyBody from "../views/GroupBuyBody";

const GroupBuyPage = () => (
  <Fragment>
    <Navbar />
    <GroupBuyBody />
  </Fragment>
);

export default withRoot(GroupBuyPage);
