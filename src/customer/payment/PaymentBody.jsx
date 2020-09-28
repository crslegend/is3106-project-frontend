import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { fade } from "@material-ui/core/styles/colorManipulator";
import PaymentForm from "./PaymentForm";

const styles = (theme) => ({
  root: {
    marginTop: "40px",
    flexGrow: 1,
  },
  icon: {
    background: fade(theme.palette.primary.main, 0.5),
    borderRadius: "50px",
    padding: "2px",
    fontSize: "3vw",
    marginLeft: "100px",
    color: fade("#48494B", 0.8),
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#48494B",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "5vw",
      marginLeft: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "6vw",
      marginLeft: "20px",
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: "left",
    paddingBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  divide: {
    marginBottom: "10px",
    height: "2px",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    },
  },
  payForm: {
    background: fade("#E6BEAE", 0.5),
    width: "100%",
  },
});

const PaymentBody = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={2}>
          <ArrowBackIcon
            onClick={() => {
              window.location.href = "viewdetails";
            }}
            className={classes.icon}
          />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.payForm}>
            <CardContent className={classes.title}>
              Check Out Details
            </CardContent>
            <Divider classes={{ root: classes.divide }} />
            <PaymentForm />
          </Card>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    </Fragment>
  );
};

PaymentBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentBody);
