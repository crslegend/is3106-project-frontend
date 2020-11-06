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
import { Typography } from "@material-ui/core";

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
  },
  button: {
    "&:hover": {
      backgroundColor: "#EEF1EF",
    },
  },
  dropzone: {
    "@global": {
      ".MuiDropzoneArea-text.MuiTypography-h5": {
        textTransform: "capitalize",
      },
    },
  },
});

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

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (date !== null) {
      const newDate = new Date(date).toLocaleDateString(undefined, options);
      // console.log(newDate);
      return newDate;
    }
    return "";
  };

  return (
    <div style={{ marginTop: 40 }}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} style={{ marginRight: "20px" }}>
          <Card>
            <form onSubmit={handleSubmitProfile}>
              <CardHeader color="warning" align="left">
                <Typography variant="body1" className={classes.cardTitleWhite}>
                  Edit Profile
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.cardCategoryWhite}
                >
                  Complete your profile
                </Typography>
              </CardHeader>
              <CardBody>
                <Container>
                  <Grid item xs={12} sm={12} md={12}>
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
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="email"
                      label="Email"
                      id="email"
                      disabled
                      value={(profile && profile.email) || ""}
                      defaultValue={profile && profile.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
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
                <Button
                  color="secondary"
                  type="submit"
                  className={classes.button}
                >
                  Update Profile
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div style={{ marginTop: 0 }}>
            <Card>
              <form onSubmit={handleSubmitPassword}>
                <CardHeader color="warning" align="left">
                  <Typography
                    variant="body1"
                    className={classes.cardTitleWhite}
                  >
                    Change Password
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Container>
                    <Grid item xs={12} sm={12} md={12}>
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
                    <Grid item xs={12} sm={12} md={12}>
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
                    <Grid item xs={12} sm={12} md={12}>
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
                  <Button
                    color="secondary"
                    type="submit"
                    className={classes.button}
                  >
                    Save Password
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={3} style={{ marginTop: "30px" }}>
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
              <Typography variant="h5" style={{ textTransform: "none" }}>
                {profile && profile.name}
              </Typography>
              <br />
              <Typography variant="subtitle1">{profile.email}</Typography>
              <Typography variant="subtitle1">
                Joined: {profile && formatDate(profile.date_joined)}
              </Typography>
              <br />
              <Button
                color="secondary"
                href="/profile/viewallgroupbuys"
                className={classes.button}
              >
                View Entered Groupbuys
              </Button>
              <Button
                color="secondary"
                href="/profile/viewallrecipes"
                className={classes.button}
              >
                View Created Recipes
              </Button>
            </CardBody>
          </Card>
        </Grid>
      </Grid>

      {/* upload photo dialog here */}
      <Dialog onClose={() => setUploadOpen(false)} open={uploadOpen}>
        <DialogTitle>
          <Typography style={{ textTransform: "capitalize", fontSize: "19px" }}>
            Upload A Photo (Max 5MB)
          </Typography>
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
            className={classes.button}
            color="secondary"
            onClick={() => {
              setProfilePhoto([]);
              setUploadOpen(false);
            }}
          >
            CANCEL
          </Button>

          <Button
            className={classes.button}
            color="secondary"
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
