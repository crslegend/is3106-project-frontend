import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import jwt_decode from "jwt-decode";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DropzoneAreaBase } from "material-ui-dropzone";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Service from "../../AxiosService";

const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(3),
    },
    orange: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    large: {
      width: "50px",
      height: "50px",
    },
  },
  button: {
    fontWeight: "normal",
    backgroundColor: theme.palette.primary.main,
    color: "black",
    // width: 150,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#48494B",
    },
    marginTop: "25px",
    textTransform: "capitalize",
    fontSize: "19px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
});

function getTimeElapsed(startDate) {
  // const currentDateTime = new Date();
  // // milliseconds
  // let different = currentDateTime.getSeconds() - 0;
  // console.log(`current time - ${currentDateTime}`);
  // console.log(`start time - ${startDate}`);
  // console.log(`different - ${different}`);
  // const secondsInMilli = 1000;
  // const minutesInMilli = secondsInMilli * 60;
  // const hoursInMilli = minutesInMilli * 60;
  // const daysInMilli = hoursInMilli * 24;
  // const elapsedDays = different / daysInMilli;
  // different %= daysInMilli;
  // const elapsedHours = different / hoursInMilli;
  // different %= hoursInMilli;
  // const elapsedMinutes = different / minutesInMilli;
  // different %= minutesInMilli;
  // const elapsedSeconds = different / secondsInMilli;
  // if (elapsedDays >= 1) {
  //   return `${elapsedDays} days ago`;
  // }
  // if (elapsedHours >= 1) {
  //   return `${elapsedHours} hours ago`;
  // }
  // if (elapsedMinutes >= 1) {
  //   return `${elapsedMinutes} mins ago`;
  // }
  // return `${elapsedSeconds} secs ago -> to be debug`;
}

const formatDate = (date) => {
  if (date !== null) {
    const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    return newDate;
  }
  return null;
};

const ProfileBody = (props) => {
  const { setSbOpen, snackbar, setSnackbar } = props;
  const { classes } = props;
  const [profile, setProfile] = useState([]);

  const [profilePhoto, setProfilePhoto] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);

  const [passwordDetails, setPasswordDetails] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPassword1Error, setNewPassword1Error] = useState(false);
  const [newPassword2Error, setNewPassword2Error] = useState(false);

  const getUserData = () => {
    if (Service.getJWT() !== null && Service.getJWT() !== undefined) {
      const userid = jwt_decode(Service.getJWT()).user_id;
      console.log(`profile useeffect userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          setProfile(null);
        });
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  function handleUploadProfileImage() {
    // instantiate form-data
    const formData = new FormData();

    // appending data to form-data
    Object.keys(profile).forEach((key) => formData.append(key, profile[key]));
    if (profilePhoto.length > 0) {
      formData.append("profile_photo", profilePhoto[0].file);
    }

    // submit form-data as per usual
    Service.client
      .put(`/users/${profile.id}`, formData)
      .then((res) => {
        console.log(res);
        setSnackbar({
          ...snackbar,
          message: "Updated!",
          severity: "success",
        });
        setSbOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          ...snackbar,
          message: "Something went wrong",
          severity: "error",
        });
        setSbOpen(true);
      });
  }

  const handleSubmitProfile = (event) => {
    event.preventDefault();

    // instantiate form-data
    const formData = new FormData();

    // appending data to form-data
    Object.keys(profile).forEach((key) => formData.append(key, profile[key]));

    // submit form-data as per usual
    Service.client
      .put(`/users/${profile.id}`, formData)
      .then((res) => {
        console.log(res);
        setSnackbar({
          ...snackbar,
          message: "Updated!",
          severity: "success",
        });
        setSbOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          ...snackbar,
          message: "Something went wrong",
          severity: "error",
        });
        setSbOpen(true);
      });
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();

    // simple update password form validation
    let error = false;
    if (passwordDetails.old_password === "") {
      setOldPasswordError(true);
      error = true;
    } else {
      setOldPasswordError(false);
    }
    if (passwordDetails.new_password1 === "") {
      setNewPassword1Error(true);
      error = true;
    } else {
      setNewPassword1Error(false);
    }
    if (passwordDetails.new_password2 === "") {
      setNewPassword2Error(true);
      error = true;
    } else {
      setNewPassword2Error(false);
    }
    if (error) return;

    console.log(passwordDetails);

    Service.client
      .patch("/users/" + profile.id, passwordDetails)
      .then((res) => {
        console.log(res);
        setSnackbar({
          ...snackbar,
          message: "Updated!",
          severity: "success",
        });
        setSbOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          ...snackbar,
          message: "Something went wrong",
          severity: "error",
        });
        setSbOpen(true);
      });
    event.target.reset();
  };

  return (
    <div style={{ marginTop: 40 }}>
      <Grid container justify="center" spacing={1}>
        <Grid item xs={12} sm={12} md={6} spacing={3}>
          <Card>
            <form onSubmit={handleSubmitProfile}>
              <CardHeader color="primary" align="left">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <Container>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      required
                      value={(profile && profile.name) || ""}
                      onChange={handleOnChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="email"
                      label="Email"
                      id="email"
                      disabled="true"
                      value={(profile && profile.email) || ""}
                      defaultValue={profile && profile.email}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="contact_number"
                      label="Contact Number"
                      id="contactnumber"
                      required
                      value={(profile && profile.contact_number) || ""}
                      defaultValue={profile && profile.contact_number}
                      onChange={handleOnChange}
                    />
                  </Grid>
                </Container>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  Update Profile
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div style={{ marginTop: 0 }}>
            <Card>
              <form onSubmit={handleSubmitPassword}>
                <CardHeader color="primary" align="left">
                  <h4 className={classes.cardTitleWhite}>Change Password</h4>
                </CardHeader>
                <CardBody>
                  <Container>
                    <Grid xs={12} sm={12} md={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        name="old_password"
                        label="Enter current password"
                        onChange={(event) =>
                          setPasswordDetails({
                            ...passwordDetails,
                            old_password: event.target.value,
                          })
                        }
                        error={oldPasswordError}
                        helperText={
                          oldPasswordError && "Enter your current password"
                        }
                        FormHelperTextProps={{
                          classes: { root: classes.helperText },
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="new_password1"
                        label="Enter new password"
                        onChange={(event) =>
                          setPasswordDetails({
                            ...passwordDetails,
                            new_password1: event.target.value,
                          })
                        }
                        error={newPassword1Error}
                        helperText={
                          newPassword1Error && "Enter your new password"
                        }
                        FormHelperTextProps={{
                          classes: { root: classes.helperText },
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="new_password2"
                        label="Retype new password"
                        onChange={(event) =>
                          setPasswordDetails({
                            ...passwordDetails,
                            new_password2: event.target.value,
                          })
                        }
                        error={newPassword2Error}
                        helperText={
                          newPassword2Error && "Retype your new password"
                        }
                        FormHelperTextProps={{
                          classes: { root: classes.helperText },
                        }}
                      />
                    </Grid>
                  </Container>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit">
                    Save Password
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={3} spacing={3}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => setUploadOpen(true)}>
                <img
                  src={
                    profilePhoto.length <= 0
                      ? profile && profile.profile_photo_url
                      : profilePhoto[0].data
                  }
                  alt={require("../../assets/profilecircle.png")}
                />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{profile.name}</h4>
              <p className={classes.description}>
                {profile.email}
                <br />
                Joined: {profile.date_joined}
              </p>
              <Button color="primary" round href="/profile/viewallgroupbuys">
                View Entered Groupbuys
              </Button>
              <Button color="primary" round href="/profile/viewallrecipes">
                View Created Recipes
              </Button>
            </CardBody>
          </Card>
        </Grid>
      </Grid>

      {/* upload photo dialog here */}
      <Dialog onClose={() => setUploadOpen(false)} open={uploadOpen}>
        <DialogTitle>
          <span>Upload Photo (Max 5MB)</span>
          <IconButton
            style={{ right: "12px", top: "8px", position: "absolute" }}
            onClick={() => {
              setProfilePhoto([]);
              setUploadOpen(false);
            }}
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
            showPreviewsInDropzone={true}
          />
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setProfilePhoto([]);
              setUploadOpen(false);
            }}
          >
            CANCEL
          </Button>

          <Button
            color="primary"
            onClick={() => {
              setUploadOpen(false);
              handleUploadProfileImage();
            }}
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(ProfileBody);
