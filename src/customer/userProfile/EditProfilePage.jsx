import React, { Fragment } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import EditProfilePage from "./EditProfileBody";

const EditProfile = () => (
  <Fragment>
    <Navbar />
    <EditProfilePage />
  </Fragment>
);

export default withRoot(EditProfile);
