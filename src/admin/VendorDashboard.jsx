import React, { Fragment, useState } from "react";
import { Route, Switch, useHistory, NavLink, BrowserRouter } from "react-router-dom";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import AdminNavBar from "./AdminNavBar";
import Service from "../AxiosService";
import VendorGroupBuyList from "./DashboardComponents/VendorGroupBuyList";
import VendorRecipeList from "./DashboardComponents/VendorRecipeList";
import VendorSettings from "./DashboardComponents/VendorSettings";

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
  activeMenuItem: {
    backgroundColor: "rgba(237, 208, 197, 0.6)",
  },
}));

const VendorDashboard = (props) => {
  const { window } = props;
  const classes = useStyles();

  // get history and current path
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    Service.removeCredentials();
    history.push("/admin");
  };

  const menu = (
    <div>
      <div className={classes.toolbar}>
        <Divider />
        <List>
          <ListItem button component={NavLink} exact to={"/admin/dashboard"} activeClassName={classes.activeMenuItem}>
            <ListItemIcon className={classes.icon}>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Groupbuys" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            exact
            to={"/admin/dashboard/recipes"}
            activeClassName={classes.activeMenuItem}
          >
            <ListItemIcon className={classes.icon}>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            exact
            to={"/admin/dashboard/settings"}
            activeClassName={classes.activeMenuItem}
          >
            <ListItemIcon className={classes.icon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon className={classes.icon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <AdminNavBar handleDrawerToggle={handleDrawerToggle} />
      <BrowserRouter>
        <nav className={classes.drawer}>
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
                keepMounted: true,
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

        <div className={classes.root}>
          <Switch>
            <Route exact path={`/admin/dashboard`} render={() => <VendorGroupBuyList />} />
            <Route path={`/admin/dashboard/recipes`} render={() => <VendorRecipeList />} />
            <Route path={`/admin/dashboard/settings`} render={() => <VendorSettings />} />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default VendorDashboard;
