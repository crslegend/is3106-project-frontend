import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CardMedia from "@material-ui/core/CardMedia";
import PaymentForm from "./PaymentForm";

import image from "../../assets/lamb.jpg";

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
  media: {
    height: "150px",
    width: "80%",
    margin: "20px 45px",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      margin: "20px 30px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      margin: "10px 20px",
    },
  },
});

const PaymentBody = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={2}>
          <ArrowBackIcon
            onClick={() => {
              window.location.href = "viewdetails";
            }}
            className={classes.icon}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={3}>
            <Grid item xs={10} md={6}>
              <Card className={classes.payForm}>
                <CardContent className={classes.title}>
                  Check Out Details
                </CardContent>
                <Divider classes={{ root: classes.divide }} />
                <PaymentForm />
              </Card>
            </Grid>
            <Grid item xs={10} md={4}>
              <Card className={classes.payForm}>
                <CardContent className={classes.title}>
                  Group Buy Summary
                </CardContent>
                <Divider classes={{ root: classes.divide }} />
                <Grid container>
                  <Grid xs={6} md={12}>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title="Grilled Lamb Chop"
                    />
                  </Grid>
                  <Grid xs={6} md={12}>
                    <CardContent>
                      <Typography display="inline">
                        Grilled Lamb Chop
                      </Typography>
                      <Typography display="inline">$9.00</Typography>
                    </CardContent>
                    <CardContent>
                      <Typography display="inline">Delivery Fee</Typography>
                      <Typography display="inline">$2.00</Typography>
                    </CardContent>
                    <Divider classes={{ root: classes.divide }} />
                    <CardContent>
                      <Typography display="inline">Total Amount:</Typography>
                      <Typography display="inline">$11.00</Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

PaymentBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentBody);
