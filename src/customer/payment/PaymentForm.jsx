import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtdecode from "jwt-decode";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useForm from "./UseForm";
import Service from "../../AxiosService";
import { Alert } from "@material-ui/lab";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    "& input": {
      backgroundColor: "white",
      borderRadius: "10px",
      textAlign: "center",
      fontSize: 18,
      padding: "8px 10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 15,
        padding: "8px 1px",
      },
    },
    "& Option": {
      fontSize: 18,
      [theme.breakpoints.down("sm")]: {
        fontSize: 15,
      },
    },
    // ammend active
    "& Select": {
      backgroundColor: "white",
      borderRadius: "10px",
      fontSize: 18,
      padding: "8px 10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 15,
        paddingTop: "4px",
        padding: "8px 5px",
      },
    },
  },
  field: {
    padding: theme.spacing(1, 2),
    margin: "0px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 0.5),
    },
    "& label": {
      fontSize: 20,
      padding: "5px 10px",
      marginLeft: "10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        padding: "5px 1px",
        marginLeft: "5px",
      },
    },
    "& label.Mui-focused": {
      color: "#5E4955",
    },
  },
  fieldWithoutArrowButtons: {
    padding: theme.spacing(1, 2),
    margin: "0px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 0.5),
    },
    "& label": {
      fontSize: 20,
      padding: "5px 10px",
      marginLeft: "10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        padding: "5px 1px",
        marginLeft: "5px",
      },
    },
    "& label.Mui-focused": {
      color: "#5E4955",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
  button: {
    margin: "10px 20px",
    backgroundColor: "#E6BEAE",
    color: "white",
  },
  dialog: {
    textAlign: "center",
  },
});

const initialValues = {
  addressOne: " ",
  addressTwo: " ",
  postal: " ",
};

const PaymentForm = (props) => {
  const {
    classes,
    quantity,
    setQuantity,
    order,
    setOrder,
    contact,
    setContact,
  } = props;
  const { values, newaddress, resetNewAddress, handleInputChange } = useForm(
    initialValues
  );
  const [customer, setCustomer] = useState("");

  const [addresses, setAddresses] = useState([""]);
  const [address, setAddress] = useState("");

  const [openConfirmSubmitModal, setConfirmSubmitModal] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [contactAlertOpen, setContactAlertOpen] = useState(false);
  const [addressAlertOpen, setAddressAlertOpen] = useState(false);
  const [quantityAlertOpen, setQuantityAlertOpen] = useState(false);

  // to set user's contact number
  useEffect(() => {
    if (Service.getJWT() !== null && Service.getJWT() !== undefined) {
      const userid = jwtdecode(Service.getJWT()).user_id;
      // console.log(`userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => {
          setCustomer(res.data);
          if (res.data.contact_number !== null) {
            setContact(res.data.contact_number);
          }

          setOrder({
            ...order,
            contact_number: res.data.contact_number,
          });
          // console.log(res.data);
        })
        .catch((error) => {
          setCustomer(null);
        });
    }
  }, []);

  // to set user's delivery addresses
  useEffect(() => {
    Service.client
      .get(`/users/${customer.id}/delivery-address`)
      .then((res) => {
        setAddresses(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        setAddresses(null);
      });
  }, []);

  // react router dom history hooks
  const history = useHistory();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setOrder({
      ...order,
      add_id: event.target.value,
    });
    resetNewAddress();
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setOrder({
      ...order,
      order_quantity: event.target.value,
    });
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
    setOrder({
      ...order,
      contact_number: event.target.value,
    });
  };

  const handleContactAlertClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setContactAlertOpen(false);
  };

  const handleAddressAlertClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddressAlertOpen(false);
  };

  const handleAlertClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleQuantityAlertClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setQuantityAlertOpen(false);
  };

  const handleSubmit = () => {
    // console.log(values);
    // console.log(newaddress);

    // form validation
    if (quantity < 1) {
      setQuantityAlertOpen(true);
      return;
    }

    if (
      address === "" &&
      (newaddress === "" ||
        newaddress.address_line1 === undefined ||
        newaddress.address_line1 === "" ||
        newaddress.postal_code === undefined ||
        newaddress.postal_code === "") &&
      (contact === null || contact === "" || contact.length !== 8)
    ) {
      setAlertOpen(true);
    } else if (contact === null || contact === "" || contact.length !== 8) {
      setContactAlertOpen(true);
    } else if (
      (address === "" && newaddress === "") ||
      newaddress.address_line1 === undefined ||
      newaddress.address_line1 === "" ||
      newaddress.postal_code === undefined ||
      newaddress.postal_code === ""
    ) {
      setAddressAlertOpen(true);
    } else {
      if ((newaddress !== null || newaddress !== undefined) && address === "") {
        // console.log(newaddress);
        Service.client
          .post(`/users/${customer.id}/delivery-address`, newaddress)
          .then((res) => {
            // console.log(res.data.add_id);
            setOrder({
              ...order,
              add_id: res.data.add_id,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setConfirmSubmitModal(true);
    }
  };

  const submitOrder = () => {
    // console.log(order);
    setConfirmSubmitModal(false);

    console.log(order);
    Service.client
      .post(`/groupbuys/${order.gb_id}/orders`, order)
      .then((res) => {
        // console.log(res);
        // push to view past orders
        history.push(`/profile/viewallgroupbuys`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            margin="dense"
            className={classes.field}
            label="Delivery Address"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={address.add_id}
            onChange={handleAddressChange}
            SelectProps={{
              native: true,
            }}
          >
            {addresses &&
              addresses.map((option, index) => (
                <option
                  className={classes.root}
                  key={index}
                  value={option.add_id}
                >
                  {option.address_line1} {option.address_line2} S(
                  {option.postal_code})
                </option>
              ))}
            <option aria-label="None" value="" />
          </TextField>
          <TextField
            fullWidth
            margin="dense"
            name="addressOne"
            className={classes.field}
            label="Address Line 1"
            disabled={address !== ""}
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={values.addressOne}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="addressTwo"
            className={classes.field}
            label="Address Line 2"
            disabled={address !== ""}
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={values.addressTwo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="postal"
            className={classes.fieldWithoutArrowButtons}
            label="Postal Code"
            disabled={address !== ""}
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={values.postal}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="dense"
            name="quantity"
            className={classes.field}
            label="Select Quantity"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
              inputProps: { min: 1 },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
          />
          <TextField
            fullWidth
            margin="dense"
            name="contact"
            className={classes.fieldWithoutArrowButtons}
            label="Mobile Number"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={contact}
            onChange={handleContactChange}
            type="number"
          />
        </Grid>
      </Grid>
      <Box textAlign="right">
        <Button
          className={classes.button}
          onClick={handleSubmit}
          variant="outlined"
        >
          Confirm
        </Button>
        <Dialog open={openConfirmSubmitModal}>
          <DialogTitle className={classes.dialog}>
            Do you want to submit?
          </DialogTitle>
          <DialogContent>
            Please confirm your order form and click okay.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmSubmitModal(false)}>Cancel</Button>
            <Button onClick={submitOrder}>Okay</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Snackbar
        open={contactAlertOpen}
        autoHideDuration={4000}
        onClose={handleContactAlertClose}
      >
        <Alert onClose={handleContactAlertClose} elevation={6} severity="error">
          <Typography variant="body1">
            Please enter a valid 8-digit contact number!
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} elevation={6} severity="error">
          <Typography variant="body1">
            Please enter a valid 8-digit contact number and address!
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={addressAlertOpen}
        autoHideDuration={4000}
        onClose={handleAddressAlertClose}
      >
        <Alert onClose={handleAddressAlertClose} elevation={6} severity="error">
          <Typography variant="body1">
            Please enter all address fields or select an address from the
            dropdown!
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={quantityAlertOpen}
        autoHideDuration={4000}
        onClose={handleQuantityAlertClose}
      >
        <Alert
          onClose={handleQuantityAlertClose}
          elevation={6}
          severity="error"
        >
          <Typography variant="body1">
            Please choose a valid quantity!
          </Typography>
        </Alert>
      </Snackbar>
    </form>
  );
};

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentForm);
