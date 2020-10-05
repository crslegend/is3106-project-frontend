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
  item2: {
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
  item1: {
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
  payForm: {
    background: fade("#E6BEAE", 0.5),
    width: "100%",
  },
  media: {
    height: "140px",
    width: "80%",
    margin: "6px 45px 0px",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      margin: "6px 30px 0px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      margin: "10px 15px",
    },
  },
  summaryLeft: {
    display: "inline",
    float: "left",
    marginRight: "20px",
    marginLeft: "18px",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      marginRight: "5px",
      marginLeft: "5px",
      fontSize: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "3px",
      marginLeft: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-10px",
      fontSize: "12px",
    },
  },
  summaryRight: {
    display: "inline",
    float: "right",
    marginRight: "15px",
    marginLeft: "20px",
    [theme.breakpoints.down("md")]: {
      marginRight: "5px",
      marginLeft: "10px",
      fontSize: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "3px",
      marginLeft: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "3px",
      marginRight: "0px",
      fontSize: "12px",
    },
  },
  summaryDivide: {
    marginTop: "10px",
    height: "1px",
    width: "95%",
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "15px",
      marginLeft: "4px",
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
            <Grid item xs={10} md={6} className={classes.item1}>
              <Card className={classes.payForm}>
                <CardContent className={classes.title}>
                  Check Out Details
                </CardContent>
                <Divider classes={{ root: classes.divide }} />
                <PaymentForm />
              </Card>
            </Grid>
            <Grid item xs={10} md={4} className={classes.item2}>
              <Card className={classes.payForm}>
                <CardContent className={classes.title}>
                  Group Buy Summary
                </CardContent>
                <Divider classes={{ root: classes.divide }} />
                <Grid container>
                  <Grid xs={5} md={12}>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title="Grilled Lamb Chop"
                    />
                  </Grid>
                  <Grid xs={7} md={12}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="900"
                        className={classes.summaryLeft}
                      >
                        Grilled Lamb Chop
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.summaryRight}
                      >
                        $9.00
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography
                        variant="body1"
                        className={classes.summaryLeft}
                      >
                        Delivery Fee
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.summaryRight}
                      >
                        $2.00
                      </Typography>
                    </CardContent>
                    <Divider
                      variant="middle"
                      classes={{ root: classes.summaryDivide }}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        className={classes.summaryLeft}
                      >
                        Total Amount:
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.summaryRight}
                      >
                        $11.00
                      </Typography>
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
