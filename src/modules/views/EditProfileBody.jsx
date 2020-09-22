import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "../components/Typography";
import Button from "../components/Button";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    margin: theme.spacing(7, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ProfileBody = (props) => {
  const classes = styles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Edit Profile" {...a11yProps(0)} />
        <Tab label="Change Password" {...a11yProps(1)} />
        <Tab label="Deactivate Account" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="Name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="username"
              label="Username"
              id="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="gender"
              label="Gender"
              id="gender"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              id="email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/profile"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2">
            Change Password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              //required
              fullWidth
              id="currentpassword"
              label="Current Password"
              name="currentPassword"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              //required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/profile"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Deactivate Account
      </TabPanel>
    </div>
  );
};

ProfileBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ProfileBody;
