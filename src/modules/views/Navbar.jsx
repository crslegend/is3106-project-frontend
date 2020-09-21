import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";

const styles = (theme) => ({
  title: {
    color: "#000000",
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
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
});

const Navbar = ({ classes }) => (
  <div>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
        <Link variant="h6" underline="none" className={classes.title} href="/">
          Sashimi
        </Link>
        <div className={classes.right}>
          {/* <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/premium-themes/onepirate/sign-in/"
            >
              {"Sign In"}
            </Link> */}
          {/* <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/premium-themes/onepirate/sign-up/"
            >
              {"Sign Up"}
            </Link> */}
        </div>
      </Toolbar>
    </AppBar>
    <div className={classes.placeholder} />
  </div>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
