import React from "react";
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
import { grey, deepOrange, deepPurple } from "@material-ui/core/colors";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: "transparent",
    color: "black",
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

const Navbar = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="black"
            className={classes.title}
            href="/"
          >
            Sashimi
          </Link>
          <div className={classes.right}>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="/login"
              >
                <AccountCircle />
                Login
              </IconButton>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
                <Avatar className={classes.orange}>J</Avatar>
              </IconButton>
              <Popover
                id={id}
                open={open}
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
                    <Avatar className={classes.large}>J</Avatar>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography>Josh Fenendo Lin</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography color={grey[500]}>
                      josh_lin@gmail.com
                    </Typography>
                  </Box>
                  <CardActions>
                    <div>
                      <Box display="flex" justifyContent="center" m={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="theme.palette.black"
                          href="/profile"
                        >
                          Manage your account
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="center" m={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="theme.palette.black"
                        >
                          Sign Out
                        </Button>
                      </Box>
                    </div>
                  </CardActions>
                </Card>
              </Popover>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
