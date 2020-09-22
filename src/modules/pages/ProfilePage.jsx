import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import ProfilePage from "../views/ProfileBody";

const Profile = () => (
  <Fragment>
    <Navbar />
    <ProfilePage />
  </Fragment>
);

export default withRoot(Profile);
