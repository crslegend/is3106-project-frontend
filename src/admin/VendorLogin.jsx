import React, { Fragment, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import Typography from "../components/Typography";
import Service from "../AxiosService";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "60px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  avatar: {
    margin: "10px",
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: "80%",
    margin: "10px",
  },
  input: {
    margin: "5px 0",
  },
  button: {
    margin: "10px 0",
  },
  helperText: {
    margin: "5px 0",
    color: "error",
  },
}));

const VendorLogin = ({ setSbOpen, snackbar, setSnackbar }) => {
  const classes = useStyles();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent html form refresh

    // simple login form validation
    let error = false;
    if (loginDetails.email === "" || !loginDetails.email.includes("@")) {
      setEmailError(true);
      error = true;
    } else {
      setEmailError(false);
    }
    // simple password validation
    if (loginDetails.password === "") {
      setPasswordError(true);
      error = true;
    } else {
      setPasswordError(false);
    }
    if (error) return;

    console.info(loginDetails);
    setLoading(true);

    // calling backend login api
    Service.client
      .post("/api/token/", loginDetails)
      .then((res) => {
        setSnackbar({
          ...snackbar,
          message: "Login Successful",
          severity: "success"
        });
        setSbOpen(true);
        setLoading(false);
        Service.storeCredentials(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          ...snackbar,
          message: "Invalid credentials",
          severity: "error",
        });
        setSbOpen(true);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={0} variant="outlined">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Vendor Login</Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              id="email"
              fullWidth
              autoFocus
              margin="normal"
              variant="outlined"
              label="Email"
              name="email"
              required
              value={loginDetails.email}
              onChange={(event) =>
                setLoginDetails({
                  ...loginDetails,
                  email: event.target.value,
                })
              }
              error={emailError}
              helperText={emailError && "Enter a valid email"}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            <TextField
              className={classes.input}
              id="password"
              fullWidth
              margin="normal"
              variant="outlined"
              label="Password"
              type="password"
              required
              value={loginDetails.password}
              onChange={(event) =>
                setLoginDetails({
                  ...loginDetails,
                  password: event.target.value,
                })
              }
              error={passwordError}
              helperText={passwordError && "Enter a password"}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress size={30} color="secondary" /> : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default VendorLogin;
