import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import jwt_decode from "jwt-decode";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import Service from "../AxiosService";
import logo from "../assets/logo.svg";
import logo2 from "../assets/SashimiLogo2.jpg";

const styles = (theme) => ({
  title: {
    color: "#ffffff",
    fontSize: 24,
    textTransform: "none",
    fontStyle: "italic",
  },
  title1: {
    color: "#ffffff",
    fontSize: 17,
    marginRight: "30px",
    "&:hover": {
      color: "#8a8a8a",
    },
  },
  title1Active: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    marginRight: "30px",
    pointerEvents: "none",
  },
  title2: {
    color: "#ffffff",
    fontSize: 17,
    marginLeft: "30px",
    "&:hover": {
      color: "#8a8a8a",
    },
  },
  title2Active: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: "30px",
    pointerEvents: "none",
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: "transparent",
    color: "#000000",
    background: "transparent",
  },
  left: {
    flex: 1,
    display: "flex",
    marginLeft: "60px",
  },
  logo: {
    // marginTop: "30px",
    height: "45%",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  orange: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  span: {
    display: "inline-block",
    borderBottom: "3px solid #ffffff",
    paddingBottom: "3px",
  },
  separator: {
    height: 0.5,
    width: "80%",
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: "#D9D9D9",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Navbar = ({ classes }) => {
  const [profile, setProfile] = useState(null);
  // react router dom history
  const history = useHistory();
  const location = useLocation();
  // console.log(location.pathname);

  // to open popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openp = Boolean(anchorEl);
  const id = openp ? "simple-popover" : undefined;

  //profile image in navbar
  const [profilePhoto, setProfilePhoto] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);

  const handleCloseSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (Service.getJWT() !== null && Service.getJWT() !== undefined) {
      let userid = jwt_decode(Service.getJWT()).user_id;
      // console.log(`profile useeffect userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => setProfile(res.data))
        .catch((err) => {
          setProfile(null);
        });
      // console.log(profile.name);
      userid = null;
    }
  }, []);

  // handle logout
  const handleLogout = () => {
    Service.removeCredentials();
    console.log("Signed out successfully");
    setProfile(null);
    setAnchorEl(null);
    setOpen(true);
    history.push("/");
  };

  return (
    <div>
      <AppBar position="fixed" elevation={5}>
        <Toolbar className={classes.toolbar}>
          {location.pathname !== "/" ? (
            <Fragment>
              <div className={classes.left}>
                <Link
                  variant="h6"
                  underline="none"
                  className={classes.title}
                  href="/"
                >
                  <img
                    src={logo}
                    style={{
                      width: "28px",
                      height: "28px",
                      marginRight: "7px",
                      marginBottom: "-3px",
                    }}
                  />
                  PrepTogether
                </Link>
              </div>
              <div>
                <Link
                  variant="body1"
                  underline="none"
                  color="primary"
                  className={
                    location.pathname === "/newrecipe"
                      ? classes.title1Active
                      : classes.title1
                  }
                  href="/newrecipe"
                >
                  <span
                    className={
                      location.pathname === "/newrecipe"
                        ? classes.span
                        : "classes.title1"
                    }
                  >
                    Create Recipe
                  </span>
                </Link>
                <Link
                  variant="body1"
                  underline="none"
                  color="primary"
                  className={
                    location.pathname === "/groupbuy" ||
                    location.pathname.substring(0, 12) === "/viewdetails"
                      ? classes.title2Active
                      : classes.title2
                  }
                  href="/groupbuy"
                >
                  <span
                    className={
                      location.pathname === "/groupbuy" ||
                      location.pathname.substring(0, 12) === "/viewdetails"
                        ? classes.span
                        : "classes.title2"
                    }
                  >
                    Group Buy
                  </span>
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.left} />
              <Link
                variant="h6"
                underline="none"
                color="primary"
                className={classes.title}
                href="/"
              >
                <img
                  src={logo}
                  style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "7px",
                    marginBottom: "-3px",
                  }}
                />
                PrepTogether
              </Link>
            </Fragment>
          )}

          <div className={classes.right}>
            {profile === null ? (
              <div>
                <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  size="large"
                  href="/auth"
                  style={{ color: "white" }}
                >
                  <AccountCircleOutlinedIcon />
                  &nbsp;Login/Register
                </Button>
              </div>
            ) : (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}
                >
                  <Avatar
                    className={classes.orange}
                    src={
                      profilePhoto.length <= 0
                        ? profile && profile.profile_photo_url
                        : profilePhoto[0].data
                    }
                  />
                </IconButton>

                <Popover
                  id={id}
                  open={openp}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Card className={classes.root}>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                      <Avatar
                        className={classes.large}
                        src={
                          profilePhoto.length <= 0
                            ? profile && profile.profile_photo_url
                            : profilePhoto[0].data
                        }
                      ></Avatar>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography>{profile.name}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography>{profile.email}</Typography>
                    </Box>
                    <CardActions>
                      <div>
                        <Box display="flex" justifyContent="center" m={1}>
                          <Button color="primary" size="large" href="/profile">
                            Manage your account
                          </Button>
                        </Box>
                        <div className={classes.separator} />
                        <Box display="flex" justifyContent="center" m={1}>
                          <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </Button>
                        </Box>
                      </div>
                    </CardActions>
                  </Card>
                </Popover>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />

      <Snackbar
        message="Signed out successfully"
        severity="success"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
      >
        <Alert onClose={handleCloseSb} severity="success">
          Signed out successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
