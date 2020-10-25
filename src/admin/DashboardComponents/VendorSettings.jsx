import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

import Service from "../../AxiosService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  topBottomMargin: {
    margin: "15px 0 30px 0px",
  },
  topMargin: {
    margin: "5px 0 0px 0px",
  },
}));

const VendorSettings = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState([]);

  const [passwordDetails, setPasswordDetails] = useState({
    old_password: "",
    new_password1: "",
    new_password2: ""
  });

  useEffect(() => {
    Service.client
      .get("/users")
      .then((res) => setProfile(res.data));
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();
    console.log(profile);

    Service.client.patch("/users/" + profile.id, profile);
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    console.log(passwordDetails);

    Service.client.post("/users/" + profile.id, passwordDetails);
  };

  return (
    <React.Fragment>
      <Typography color="inherit" align="left" variant="h4">
        Settings
      </Typography>
      <Grid container className={classes.root}>
        <Grid item={true} xs={12}>
          <form onSubmit={handleSubmitProfile}>
            <Card>
              <Grid container className={classes.root}>
                <Grid item={true} xs={6} md={5}>
                  <div className={classes.root}>
                    <Avatar sizes={classes.large}>FP</Avatar>
                  </div>
                </Grid>
                <Grid
                  item={true}
                  container
                  direction="column"
                  justify="space-between"
                  className={classes.topBottomMargin}
                  xs={6}
                  md={5}
                >
                  <TextField
                    id="name"
                    label="Name"
                    name="name"
                    value={profile.name || ''}
                    onChange={handleOnChange}
                  />
                  <TextField
                    className={classes.topMargin}
                    label="Email"
                    name="email"
                    value={profile.email || ''}
                    defaultValue={profile.email}
                    onChange={handleOnChange}
                  />
                  <TextField
                    className={classes.topMargin}
                    label="Vendor Name"
                    name="vendor_name"
                    value={profile.vendor_name || ''}
                    onChange={handleOnChange}
                  />
                </Grid>
              </Grid>
            </Card>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              type="submit"
              className={classes.topMargin}
            >
              Save
            </Button>
          </form>
        </Grid>

        <Grid item={true} xs={12}>
          <form onSubmit={handleSubmitPassword}>
            <Card>
              <Grid
                container
                justify="center"
                className={`${classes.root} ${classes.topMargin}`}
              >
                <Grid
                  item={true}
                  container
                  direction="column"
                  xs={6}
                  md={5}
                  className={classes.topBottomMargin}
                >
                  <Typography variant="h5">Change Password</Typography>
                  <TextField type="password" name="old_password" label="Enter current password" onChange={(event) => setPasswordDetails({...passwordDetails, old_password: event.target.value,})}/>
                  <TextField type="password" name="new_password1" label="Enter new password" onChange={(event) => setPasswordDetails({...passwordDetails, new_password1: event.target.value,})} />
                  <TextField type="password" name="new_password2" label="Retype new password" onChange={(event) => setPasswordDetails({...passwordDetails, new_password2: event.target.value,})} />
                </Grid>
              </Grid>
            </Card>
            <Button
              className={classes.topMargin}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default VendorSettings;
