import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import ProfilePage from "./ProfileBody";

const Profile = () => (
  <Fragment>
    <Navbar />
    <ProfilePage />
  </Fragment>
);

export default withRoot(Profile);
