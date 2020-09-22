import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import EditProfilePage from "../views/EditProfileBody";

const EditProfile = () => (
  <Fragment>
    <Navbar />
    <EditProfilePage />
  </Fragment>
);

export default withRoot(EditProfile);
