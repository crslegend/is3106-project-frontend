import React, { Fragment, useState } from "react";
import Typography from "../components/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import AdminNavBar from "./AdminNavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "64px",
    flexGrow: 1,
    padding: "30px",
  },
  toolbar: theme.mixins.toolbar,
}));

const VendorDashboard = () => {
  const classes = useStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const menu = (
    <div className={classes.toolbar}>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment>
      <AdminNavBar menuOpen={menuOpen} />
      <div className={classes.root}>Dashboard</div>
    </Fragment>
  );
};

export default VendorDashboard;
