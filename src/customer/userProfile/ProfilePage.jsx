import React, { Fragment, useState } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import ProfileBody from "./ProfileBody";

const Profile = (props) => {
  return (
    <Fragment>
      <Navbar />
      <ProfileBody {...props} />
    </Fragment>
  );
};

export default withRoot(Profile);
