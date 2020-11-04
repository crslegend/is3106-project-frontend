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
import jwt_decode from "jwt-decode";
import Container from "@material-ui/core/Container";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DropzoneAreaBase } from "material-ui-dropzone";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
        <Container>
          <Box>{children}</Box>
        </Container>
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

const ProfileBody = () => {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const [profile, setProfile] = useState(null);

  const [profilePhoto, setProfilePhoto] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);
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
    let mounted = false;
    if (
      mounted &&
      Service.getJWT() !== null &&
      Service.getJWT() !== undefined
    ) {
      let userid = jwt_decode(Service.getJWT()).user_id;
      console.log(`profile useeffect userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => setProfile(res.data))
        .catch((err) => {
          setProfile(null);
        });
      // userid = null;
      //console.log(profile.name);
    }

    return () => (mounted = false);
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
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            Profile Photo
            <img
              alt="J Sharp"
              // eslint-disable-next-line global-require
              src={require("../../assets/profilecircle.png")}
              width="150px"
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

        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<CloudUploadIcon />}
          style={{ marginTop: "10px" }}
          onClick={() => setUploadOpen(true)}
        >
          Upload Photo
        </Button>

        {/* upload photo dialog here */}
        <Dialog onClose={() => setUploadOpen(false)} open={uploadOpen}>
          <DialogTitle>
            <span>Upload Photo (Max 5MB)</span>
            <IconButton
              style={{ right: "12px", top: "8px", position: "absolute" }}
              onClick={() => setUploadOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DropzoneAreaBase
              dropzoneClass={classes.dropzone}
              dropzoneText="Drag and drop a file or click here"
              acceptedFiles={["image/*"]}
              filesLimit={1}
              fileObjects={profilePhoto}
              maxFileSize={5000000}
              onAdd={(newPhoto) => {
                // console.log("onAdd", newPhoto);
                setProfilePhoto([].concat(newPhoto));
              }}
              onDelete={(deletePhotoObj) => {
                // console.log("onDelete", deletePhotoObj);
                setProfilePhoto([]);
              }}
              showPreviews={true}
              showPreviewsInDropzone={false}
            />
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={() => setUploadOpen(false)}>
              CANCEL
            </Button>

            <Button color="primary" onClick={() => setUploadOpen(false)}>
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="Name"
            required
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="conatactnumber"
            label="Contact Number"
            id="contactnumber"
            required
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        Change Password
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
      </TabPanel>
    </div>
  );
};

export default ProfileBody;
