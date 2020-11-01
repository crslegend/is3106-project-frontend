import React from "react";
import AppBar from "../components/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#000000",
    fontSize: 24,
    textAlign: "center",
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: "5px",
    justifySelf: "flex-start",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  subscript: {
    fontSize: "small",
  },
}));

const AdminNavBar = ({ handleDrawerToggle, width }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Link variant="h6" underline="none" className={classes.title} href="/admin">
          Sashimi <sub className={classes.subscript}>Vendor</sub>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavBar;
