import React, { Fragment, useState } from "react";
import Typography from "../components/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SettingsIcon from "@material-ui/icons/Settings";

import AdminNavBar from "./AdminNavBar";

const mobileView = window.innerWidth < 900;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "64px",
    flexGrow: 1,
    padding: "30px",
    [theme.breakpoints.up("md")]: {
      marginLeft: "200px",
    },
  },
  toolbar: {
    marginTop: "63.99px",
  },
  drawer: {
    width: "200px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "200px",
  },
  icon: {
    minWidth: "auto",
    marginRight: "10px",
  },
}));

const VendorDashboard = (props) => {
  const { window } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu = (
    <div>
      <div className={classes.toolbar}>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Groupbuys" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <AdminNavBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {menu}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {menu}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.root}>Dashboard</div>
    </Fragment>
  );
};

export default VendorDashboard;
