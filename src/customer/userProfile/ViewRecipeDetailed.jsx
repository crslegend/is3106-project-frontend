import React, { Fragment, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";
import Service from "../../AxiosService";
import withRoot from "../../constants/withRoot";

const styles = (theme) => {};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 25,
    width: "70%",
    borderRadius: 10,
    marginLeft: "30px",
    marginTop: "0px",
    [theme.breakpoints.down("sm")]: {
      height: 20,
      width: "90%",
      marginLeft: "0px",
    },
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#E19576",
  },
}))(LinearProgress);

const ViewRecipeDetailed = () => {
  return <Card></Card>;
};

export default withRoot(withStyles(styles)(ViewRecipeDetailed));
