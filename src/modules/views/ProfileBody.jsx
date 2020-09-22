import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
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
});

const ProfileBody = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <img
        alt="J Sharp"
        // eslint-disable-next-line global-require
        src={require("../../assets/profilecircle.png")}
        width="250px"
      />
      <Button
        variant="contained"
        size="medium"
        component="a"
        href="/editprofile"
      >
        Edit Profile
      </Button>
    </div>
  );
};

ProfileBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileBody);
