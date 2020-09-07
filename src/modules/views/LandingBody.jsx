import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { ArrowDownwardIcon } from "@material-ui/icons";
import { Container } from "@material-ui/core";

import Button from "../components/Button";
import Typography from "../components/Typography";

import image from "../../assets/December9_2-1280x879.jpg";

const backgroundImage = image;

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "90vh",
      minHeight: 500,
      maxHeight: 1300,
    },
  },
  container: {
    display: "inline",
    flexDirection: "column",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: -0.5,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: -0.5,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: -2,
    backgroundImage: `url(${backgroundImage})`,
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
  button1: {
    marginRight: 50,
  },
  button2: {
    marginLeft: 50,
  },
});

const LandingBody = (props) => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Welcome
        </Typography>
        <br />
        <Button
          color="secondary"
          variant="contained"
          size="medium"
          className={classes.button1}
          component="a"
          href="/newrecipe"
        >
          Gather
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="medium"
          className={classes.button2}
          component="a"
          href="/groupbuy"
        >
          Group Buy
        </Button>

        {/* this gives a dark backdrop on the image */}
        <div className={classes.backdrop} />
        <div className={classes.background} />
      </Container>
    </section>
  );
};

LandingBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingBody);
