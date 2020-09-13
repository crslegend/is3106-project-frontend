import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { ArrowDownwardIcon } from "@material-ui/icons";
import { Container } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

import Button from "../components/Button";
import Typography from "../components/Typography";

import image from "../../assets/December9_2-1280x879.jpg";

const backgroundImage = image;

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    // position: "relative",
    // display: "flex",
    // alignItems: "center",

    // [theme.breakpoints.up("sm")]: {
    //   height: "100vh",
    //   minHeight: 500,
    //   maxHeight: 1300,
    // },
  },
  outerContainer: {
    marginTop: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: -2,
    backgroundImage: `url(${backgroundImage})`,
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
  button: {
    outline: "white solid 0.5px",
    fontWeight: "normal",
    backgroundColor: fade(theme.palette.common.white, 0.1),
    color: "white",
    width: 150,
  },
});

const LandingBody = (props) => {
  const { classes, getAxiosInstance } = props;

  getAxiosInstance();

  return (
    <section className={classes.root}>
      <Container className={classes.outerContainer}>
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Welcome
        </Typography>
        <br />
        <Container className={classes.innerContainer}>
          <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            component="a"
            href="/newrecipe"
          >
            Create Recipe
          </Button>
          <div style={{ marginLeft: 40, marginRight: 40 }} />
          <Button
            color="secondary"
            variant="outlined"
            size="medium"
            className={classes.button}
            component="a"
            href="/groupbuy"
          >
            Group Buy
          </Button>
        </Container>

        {/* this gives a dark backdrop on the image */}
        <div className={classes.backdrop} />
        <div className={classes.background} />
      </Container>
    </section>
  );
};

LandingBody.propTypes = {
  classes: PropTypes.object.isRequired,
  getAxiosInstance: PropTypes.func.isRequired,
};

export default withStyles(styles)(LandingBody);
