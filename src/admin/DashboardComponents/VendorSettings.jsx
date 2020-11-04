import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";

import Service from "../../AxiosService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatarRoot: {
    width: "10vw",
    height: "10vw",
  },
  dropzone: {
    padding: "0 10px",
    minHeight: "150px",
  },
  section: {
    padding: "8px",
  },
  colorDefault: {
    backgroundColor: "transparent",
  },
  topBottomMargin: {
    margin: "15px 0 30px 0",
  },
  topMargin: {
    margin: "5px 0 0 0",
  },
  bottomMargin: {
    margin: "0 0 8px 0",
  },
  helperText: {
    margin: "5px 0",
    color: "error",
  },
}));

const VendorSettings = ({ setSbOpen, snackbar, setSnackbar }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState();

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

  useEffect(() => {
    Service.client
      .get(`/users/${jwt_decode(Service.getJWT()).user_id}`)
      .then((res) => {
        setProfile({
          ...res.data.user,
          vendor_name: res.data.vendor_name,
        });
      });
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();

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
    <React.Fragment>
      <Typography color="inherit" align="left" variant="h4">
        Settings
      </Typography>
      <Grid container className={classes.root}>
        <Grid item={true} xs={12}>
          <form onSubmit={handleSubmitProfile}>
            <Card className={classes.section}>
              <Grid container>
                <Grid
                  item={true}
                  xs={6}
                  md={5}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    classes={{
                      root: classes.avatarRoot,
                      colorDefault: classes.colorDefault,
                    }}
                    src={
                      profilePhoto.length <= 0
                        ? profile && profile.profile_photo_url
                        : profilePhoto[0].data
                    }
                  />
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
                    value={(profile && profile.name) || ""}
                    defaultValue={profile && profile.name}
                    onChange={handleOnChange}
                  />
                  <TextField
                    className={classes.topMargin}
                    label="Contact Number"
                    name="contact_number"
                    value={(profile && profile.contact_number) || ""}
                    defaultValue={profile && profile.contact_number}
                    onChange={handleOnChange}
                  />
                  <TextField
                    className={classes.topMargin}
                    label="Vendor Name"
                    name="vendor_name"
                    value={(profile && profile.vendor_name) || ""}
                    defaultValue={profile && profile.vendor_name}
                    onChange={handleOnChange}
                  />
                </Grid>
              </Grid>
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
            </Card>
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
                  <TextField
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
                  <TextField
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
                    helperText={newPassword1Error && "Enter your new password"}
                    FormHelperTextProps={{
                      classes: { root: classes.helperText },
                    }}
                  />
                  <TextField
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
                    helperText={newPassword2Error && "Retype your new password"}
                    FormHelperTextProps={{
                      classes: { root: classes.helperText },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                className={classes.bottomMargin}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Save
              </Button>
            </Card>
          </form>
        </Grid>
      </Grid>

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
    </React.Fragment>
  );
};

export default VendorSettings;
