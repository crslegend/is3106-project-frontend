import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import Service from "../AxiosService";

const styles = (theme) => ({
  title: {
    color: "#000000",
    fontSize: 24,
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
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Navbar = ({ classes }) => {
  const [profile, setProfile] = useState(null);
  // react router dom history
  const history = useHistory();

  // to open popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openp = Boolean(anchorEl);
  const id = openp ? "simple-popover" : undefined;

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
    Service.client
      .get("/auth/get_current_user")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        // console.log(err);
        setProfile(null);
      });
  }, []);

  // handle logout
  const handleLogout = () => {
    Service.removeCredentials();
    console.log("Signed out successfully");
    setProfile(null);
    setAnchorEl(null);
    setOpen(true);
    // history.push("/");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="primary"
            className={classes.title}
            href="/"
          >
            Sashimi
          </Link>
          <div className={classes.right}>
            {profile === null && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  href="/auth"
                >
                  <AccountCircle />
                  SIGN IN
                </IconButton>
              </div>
            )}
            {profile !== null && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}
                >
                  {profile.name}
                  <Avatar className={classes.orange}>{profile.name}</Avatar>
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
                      <Avatar className={classes.large}>{profile.name}</Avatar>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography>{profile.name}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography>
                        {profile.email || "No user error"}
                      </Typography>
                    </Box>
                    <CardActions>
                      <div>
                        <Box display="flex" justifyContent="center" m={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            href="/profile"
                          >
                            Manage your account
                          </Button>
                        </Box>
                        <Box display="flex" justifyContent="center" m={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </Button>
                          ;
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
