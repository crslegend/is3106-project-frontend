import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

import Button from "../../components/Button";
import Typography from "../../components/Typography";

import login1 from "../../assets/login1.jpg";
import login2 from "../../assets/login2.jpg";
import login3 from "../../assets/login3.jpg";
import login4 from "../../assets/login4.jpg";
import login5 from "../../assets/login5.jpg";
import login6 from "../../assets/login6.jpg";
import login7 from "../../assets/login7.jpg";
import login8 from "../../assets/login8.jpg";
import login9 from "../../assets/login9.jpg";
import login10 from "../../assets/login10.jpg";
// import sashimilogo from "../../assets/SashimiLogo2.jpg";

const items = [
  login1,
  login2,
  login3,
  login4,
  login5,
  login6,
  login7,
  login8,
  login9,
  login10,
];
const backgroundImage = items[Math.floor(Math.random() * items.length)];

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
  },
  outerContainer: {
    marginTop: 180,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.outerContainer}>
        <Typography
          color="inherit"
          align="left"
          variant="h3"
          style={{
            textTransform: "none",
            marginLeft: "200px",
            marginBottom: "10px",
          }}
        >
          Healthy.
          <br />
          Fresh.
          <br />
          Eco-friendly.
          <br />
        </Typography>
        <Typography
          color="inherit"
          align="left"
          variant="h6"
          marked="center"
          style={{
            textTransform: "none",
            marginLeft: "200px",
            marginBottom: "30px",
          }}
        >
          That’s how we think preparing meals at home should be.
          <br />
          Join Singapore’s large community-driven grocery groupbuy platform
          today.
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
};

export default withStyles(styles)(LandingBody);
