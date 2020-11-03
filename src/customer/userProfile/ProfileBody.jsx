import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import jwt_decode from "jwt-decode";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Service from "../../AxiosService";

const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(3),
    },
    orange: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    large: {
      width: "50px",
      height: "50px",
    },
  },
  button: {
    fontWeight: "normal",
    backgroundColor: theme.palette.primary.main,
    color: "black",
    // width: 150,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#48494B",
    },
    marginTop: "25px",
    textTransform: "capitalize",
    fontSize: "19px",
  },
});

function getTimeElapsed(startDate) {
  const currentDateTime = new Date();
  // milliseconds
  let different = currentDateTime.getSeconds() - 0;

  console.log(`current time - ${currentDateTime}`);
  console.log(`start time - ${startDate}`);
  console.log(`different - ${different}`);

  const secondsInMilli = 1000;
  const minutesInMilli = secondsInMilli * 60;
  const hoursInMilli = minutesInMilli * 60;
  const daysInMilli = hoursInMilli * 24;

  const elapsedDays = different / daysInMilli;
  different %= daysInMilli;

  const elapsedHours = different / hoursInMilli;
  different %= hoursInMilli;

  const elapsedMinutes = different / minutesInMilli;
  different %= minutesInMilli;

  const elapsedSeconds = different / secondsInMilli;

  if (elapsedDays >= 1) {
    return `${elapsedDays} days ago`;
  }
  if (elapsedHours >= 1) {
    return `${elapsedHours} hours ago`;
  }
  if (elapsedMinutes >= 1) {
    return `${elapsedMinutes} mins ago`;
  }
  return `${elapsedSeconds} secs ago -> to be debug`;
}

const ProfileBody = (props) => {
  const { classes } = props;
  const [profile, setProfile] = useState([]);

  const getUserData = () => {
    if (Service.getJWT() !== null && Service.getJWT() !== undefined) {
      const userid = jwt_decode(Service.getJWT()).user_id;
      console.log(`profile useeffect userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          setProfile(null);
        });
      // console.log(profile.hasOwnProperty('name'));
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  console.log(profile);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={3} style={{ marginTop: "30px" }}>
          <img
            alt="J Sharp"
            // eslint-disable-next-line global-require
            src={require("../../assets/profilecircle.png")}
            width="150px"
          />
          <br />
          <Button
            variant="contained"
            size="medium"
            component="a"
            href="/editprofile"
          >
            Edit Profile
          </Button>
        </Grid>
        <Grid item xs={7} style={{ marginTop: "30px" }}>
          <Card style={{ backgroundColor: "#FFE2DB" }}>
            <CardContent>
              <Typography>
                {profile && profile.name}
                <br />
                {profile && profile.email}
                <br />
                Joined: {getTimeElapsed(profile && profile.date_joined)}
              </Typography>
            </CardContent>
          </Card>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              component="a"
              href="/profile/viewallgroupbuys"
              className={classes.button}
            >
              View Entered Groupbuys
            </Button>

            <Button
              component="a"
              href="/profile/viewallrecipes"
              className={classes.button}
            >
              View Created Recipes
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ProfileBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileBody);
