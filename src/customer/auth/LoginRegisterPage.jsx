import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Button from "@material-ui/core/Button";
import jwt_decode from "jwt-decode";
import withRoot from "../../constants/withRoot";
import Typography from "../../components/Typography";
import Service from "../../AxiosService";
import login1 from "../../assets/login1.jpg";
import login2 from "../../assets/login2.jpg";
import login3 from "../../assets/login3.jpg";
import login4 from "../../assets/login4.jpg";
import login5 from "../../assets/login5.jpg";
import login6 from "../../assets/login6.jpg";
import login7 from "../../assets/login7.jpg";
import login8 from "../../assets/login8.jpg";
import login9 from "../../assets/login9.jpg";
import login10 from "../../assets/login10.jpg";

const items = [
  login1,
  login2,
  login3,
  login4,
  login5,
  login6,
  login7,
  login8,
  login9,
  login10,
];
const backgroundImage = items[Math.floor(Math.random() * items.length)];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
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
  avatar1: {
    margin: theme.spacing(1.5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px",
  },
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Authentication = ({ setSbOpen, snackbar, setSnackbar }) => {
  const classes = useStyles();
  let flippyHorizontal;

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  // react router dom history
  const history = useHistory();

  // handle form submit
  const handleSubmitLogin = (e) => {
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

    setLoading(true);

    // calling backend login api
    Service.client
      .post("/api/token/", loginDetails)
      .then((res1) => {
        // check if is vendor
        const userid = jwt_decode(res1.data.access).user_id;
        Service.baseClient
          .get(`/users/${userid}`, {
            headers: {
              Authorization: `Bearer ${res1.data.access}`,
            },
          })
          .then((res2) => {
            if (res2.data.is_vendor) {
              setSnackbar({
                ...snackbar,
                message: "Invalid login",
                severity: "error",
              });
              setSbOpen(true);
              setLoading(false);
              console.log("Invalid login");
            } else {
              Service.storeCredentials(res1.data);
              setSnackbar({
                ...snackbar,
                message: "Login Successful",
                severity: "success",
              });
              setSbOpen(true);
              setLoading(false);

              // redirect to dashboard
              console.log("Log in successfully");
              history.push("/");
            }
          });
      })
      .catch((err) => {
        console.log(`${err} - invalid credentials`);
        setSnackbar({
          ...snackbar,
          message: "Invalid credentials. Please try again.",
          severity: "error",
        });
        setSbOpen(true);
        setLoading(false);
      });
  };

  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState(false);

  // handle form submit
  const handleSubmitRegister = (e) => {
    e.preventDefault(); // prevent html form refresh

    // simple login form validation
    let error = false;

    if (registerDetails.name === "") {
      setNameError(true);
      error = true;
    } else {
      setNameError(false);
    }
    if (registerDetails.email === "" || !registerDetails.email.includes("@")) {
      setEmailError(true);
      error = true;
    } else {
      setEmailError(false);
    }
    // simple password validation
    if (registerDetails.password === "") {
      setPasswordError(true);
      error = true;
    } else {
      setPasswordError(false);
    }
    if (error) return;

    setLoading(true);
    console.log(`register name - ${registerDetails.name}`);
    console.log(`register email - ${registerDetails.email}`);
    console.log(`register password - ${registerDetails.password}`);

    // calling backend register api
    Service.client
      .post("/users", registerDetails)
      .then(() => {
        Service.client.post("/api/token/", registerDetails).then((res2) => {
          Service.storeCredentials(res2.data);

          setSnackbar({
            ...snackbar,
            message: "Registration Successful",
            severity: "success",
          });
          setSbOpen(true);
          setLoading(false);
          setRegisterDetails(null);

          // redirect to dashboard
          history.push("/");
        });
      })
      .catch((err) => {
        setSnackbar({
          ...snackbar,
          message: "Email has been registered before. Please use a new email.",
          severity: "error",
        });
        setSbOpen(true);
        setLoading(false);
        setRegisterDetails(null);
        console.log(`${err} - something went wrong`);
      });
  };

  return (
    <div className={classes.image}>
      <Box display="flex" flexDirection="row-reverse" bgcolor="transparent">
        <Flippy
          ref={(r) => {
            flippyHorizontal = r;
          }}
          flipOnClick={false}
          style={{
            height: "600px",
            width: "450px",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }} /// these are optional style, it is not necessary
        >
          <FrontSide
            style={{
              height: "100%",
              backgroundColor: "white",
            }}
            animationDuration={1000}
          >
            <div className={classes.paper}>
              <Link variant="h4" underline="none" color="inherit" href="/">
                Sashimi
              </Link>
              <br />
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmitLogin}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="registeremail"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="registerpassword"
                  autoComplete="current-password"
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
                  FormHelperTextProps={{
                    classes: { root: classes.helperText },
                  }}
                />
                <Grid container>
                  <Grid item>
                    {/* <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    /> */}
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmitLogin}
                >
                  {loading ? (
                    <CircularProgress size={30} color="secondary" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="\forgetpassword" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link
                      variant="body2"
                      color="inherit"
                      onClick={() => flippyHorizontal.toggle()}
                      className={classes.link}
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </FrontSide>

          <BackSide
            style={{
              height: "100%",
              backgroundColor: "white",
            }}
            animationDuration={1000}
          >
            <div className={classes.paper}>
              <Link variant="h4" underline="none" color="inherit" href="/">
                Sashimi
              </Link>
              <br />
              <Avatar className={classes.avatar1}>
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmitRegister}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={(event) =>
                        setRegisterDetails({
                          ...registerDetails,
                          name: event.target.value,
                        })
                      }
                      error={nameError}
                      helperText={emailError && "Enter a name"}
                      FormHelperTextProps={{
                        classes: { root: classes.helperText },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event) =>
                        setRegisterDetails({
                          ...registerDetails,
                          email: event.target.value,
                        })
                      }
                      error={emailError}
                      helperText={emailError && "Enter a valid email"}
                      FormHelperTextProps={{
                        classes: { root: classes.helperText },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(event) =>
                        setRegisterDetails({
                          ...registerDetails,
                          password: event.target.value,
                        })
                      }
                      error={passwordError}
                      helperText={passwordError && "Enter a password"}
                      FormHelperTextProps={{
                        classes: { root: classes.helperText },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmitRegister}
                >
                  {loading ? (
                    <CircularProgress size={30} color="secondary" />
                  ) : (
                    "Register"
                  )}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      color="inherit"
                      onClick={() => flippyHorizontal.toggle()}
                      variant="body2"
                      className={classes.link}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </BackSide>
        </Flippy>
      </Box>
    </div>
  );
};

export default withRoot(Authentication);
