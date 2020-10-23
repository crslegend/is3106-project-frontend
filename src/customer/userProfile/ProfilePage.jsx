import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import ProfileBody from "./EditProfileBody";

const Profile = () => (
  <Fragment>
    <Navbar />
    <ProfileBody />
  </Fragment>
);

export default withRoot(Profile);
