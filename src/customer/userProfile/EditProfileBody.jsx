import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

import Service from "../../AxiosService";

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
  // children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ProfileBody = () => {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const [profile, setProfile] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [passwordDetails, setPasswordDetails] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    console.log(passwordDetails);

    Service.client.post(
      `/auth/change_user_password/${profile.id}`,
      passwordDetails
    );
  };

  useEffect(() => {
    Service.client
      .get("/auth/get_current_user")
      .then((res) => setProfile(res.data));
  }, []);

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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography component="h1" variant="h5">
                Profile Photo
              </Typography>
              <img
                alt="J Sharp"
                // eslint-disable-next-line global-require
                src={require("../../assets/profilecircle.png")}
                width="200px"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="raised"
                  component="span"
                  className={classes.button}
                >
                  Upload
                </Button>
              </label>
            </Grid>
          </Grid>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="Name"
              // value={profile.name || ""}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              id="email"
              disabled="true"
              // value={profile.email || ""}
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
              // required
              fullWidth
              id="currentpassword"
              label="Current Password"
              name="currentPassword"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              // required
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
