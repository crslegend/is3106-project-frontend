import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    fontFamily: "Raleway",
    fontSize: 35,
    fontWeight: 550,
    letterSpacing: 3,
    color: "#2A2B2A",
    padding: theme.spacing(2),
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
      letterSpacing: 2,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      padding: theme.spacing(3),
    },
  },
});

const CardDetailBody = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={1} />
        <Grid item xs={6}>
          <div className={classes.header}>Available Group Buys</div>
        </Grid>
        <Grid item xs={5} />
      </Grid>
    </Fragment>
  );
};

CardDetailBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardDetailBody);
