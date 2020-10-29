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
} from "@material-ui/core";
import useForm from "./UseForm";
import Service from "../../AxiosService";

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
  deliveryaddress: " ",
  addressOne: " ",
  addressTwo: " ",
  postal: " ",
};

const payments = [
  {
    value: "CARD",
    label: "CARD",
  },
  {
    value: "CASH",
    label: "CASH",
  },
];

const PaymentForm = (props) => {
  const { classes, quantity, setQuantity, order, setOrder } = props;
  const { values, resetForm, handleInputChange } = useForm(initialValues);
  const [customer, setCustomer] = useState("");
  const [contact, setContact] = useState("");

  const [payment, setPayment] = React.useState("CARD");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (Service.getJWT() !== null && Service.getJWT() !== undefined) {
      const userid = jwtdecode(Service.getJWT()).user_id;
      console.log(`userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => {
          setCustomer(res.data);
          setContact(res.data.contact_number);
          console.log(res.data.contact_number);
        })
        .catch((err) => {
          setCustomer(null);
        });
    }
  }, []);

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setOrder({
      ...order,
      order_quantity: quantity,
    });
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
    if (event === null || event === undefined) {
      setOrder({
        ...order,
        contact_number: customer.contact_number, // change to session user contact
      });
    }
    setOrder({
      ...order,
      contact_number: contact,
    });
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setOpen(false);
    event.preventDefault();
    resetForm();
  };

  return (
    <form>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <TextField
            fullWidth="true"
            margin="dense"
            name="deliveryaddress"
            className={classes.field}
            label="Delivery Address"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={values.deliveryaddress}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            name="addressOne"
            className={classes.field}
            label="Address Line 1"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={values.addressOne}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            name="addressTwo"
            className={classes.field}
            label="Address Line 2"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={values.addressTwo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            name="postal"
            className={classes.field}
            label="Postal Code"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={values.postal}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth="true"
            margin="dense"
            name="quantity"
            className={classes.field}
            label="Select Quantity"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            name="mobile"
            className={classes.field}
            label="Mobile Number"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={contact}
            onChange={handleContactChange}
          />
          <TextField
            select
            fullWidth="true"
            margin="dense"
            className={classes.field}
            label="Payment method"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={payment}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {payments.map((option) => (
              <option
                className={classes.root}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Box textAlign="right">
        <Button
          className={classes.button}
          onClick={handleOpenDialog}
          variant="outlined"
        >
          Confirm
        </Button>
        <Dialog open={open} onCancel={handleClose}>
          <DialogTitle className={classes.dialog}>
            Do you want to submit?
          </DialogTitle>
          <DialogContent>
            Please confirm your order form and click okay.
          </DialogContent>
          <DialogActions>
            <Button type="button" onclick={handleSubmit}>
              Okay
            </Button>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </form>
  );
};

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentForm);
