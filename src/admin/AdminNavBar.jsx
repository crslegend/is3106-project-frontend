import React from "react";
import clsx from "clsx";
import AppBar from "../components/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#000000",
    fontSize: 24,
    textAlign: "center",
  },
  toolbar: {
    justifyContent: "center",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: window.innerWidth * 0.3,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AdminNavBar = ({ menuOpen }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx({
        [classes.appBarShift]: menuOpen,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <Link variant="h6" underline="none" className={classes.title} href="/admin">
          Sashimi - Vendor Portal
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavBar;
