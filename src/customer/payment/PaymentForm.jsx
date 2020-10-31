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
  addressOne: "",
  addressTwo: "",
  postal: "",
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
  const {
    classes,
    quantity,
    setQuantity,
    order,
    setOrder,
    contact,
    setContact,
  } = props;
  const { values, resetNewAddress, handleInputChange } = useForm(initialValues);
  const [customer, setCustomer] = useState("");
  const [payment, setPayment] = React.useState("CARD");

  const [addresses, setAddresses] = useState([""]);
  const [address, setAddress] = useState("");
  const [newaddress, setNewaddress] = useState("");

  const [openConfirmSubmitModal, setConfirmSubmitModal] = useState(false);

  // to set user's contact number
  useEffect(() => {
    if (Service.getJWT() !== null && Service.getJWT() !== undefined) {
      const userid = jwtdecode(Service.getJWT()).user_id;
      console.log(`userid = ${userid}`);
      Service.client
        .get(`/users/${userid}`)
        .then((res) => {
          setCustomer(res.data);
          setContact(res.data.contact_number);
          setOrder({
            ...order,
            contact_number: res.data.contact_number,
          });
          console.log(res.data);
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
        console.log(res.data);
      })
      .catch((error) => {
        setAddresses(null);
      });
  }, []);
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setOrder({
      ...order,
      add_id: event.target.value,
    });
    resetNewAddress();
  };

  const handleChange = (event) => {
    setPayment(event.target.value);
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

  const handleSubmit = () => {
    console.log(values);
    if (values !== null || values !== undefined || values.addressOne !== "") {
      setNewaddress({
        address_line1: values.addressOne,
        address_line2: values.addressTwo,
        postal_code: values.postal,
      });
      console.log(newaddress);
      //      Service.client
      //        .post(`/users/${customer.id}/delivery-address`, newaddress)
      //       .then((res) => {
      //         console.log(res);
      //         console.log("new address");
      //       });
    }
    setConfirmSubmitModal(true);
  };

  const submitOrder = () => {
    console.log(order);
    setConfirmSubmitModal(false);

    // instantiate form-data
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(order));

    Service.client
      .post(`/groupbuys/${order.gb_id}/orders`, order)
      .then((res) => {
        console.log(res);
        // push to view past orders
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
            fullWidth="true"
            margin="dense"
            className={classes.field}
            label="Delivery Address"
            InputProps={{
              classes: { input: classes.root },
              disableUnderline: true,
            }}
            value={address.add_id}
            onChange={handleAddressChange}
            SelectProps={{
              native: true,
            }}
          >
            {addresses &&
              addresses.map((option) => (
                <option
                  className={classes.root}
                  key={option.add_id}
                  value={option.add_id}
                >
                  {option.address_line1} {option.address_line2} S(
                  {option.postal_code})
                </option>
              ))}
            <option aria-label="None" value="" />
          </TextField>
          <TextField
            fullWidth="true"
            margin="dense"
            name="addressOne"
            className={classes.field}
            label="Address Line 1"
            disabled={address !== ""}
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
            disabled={address !== ""}
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
            disabled={address !== ""}
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
            name="contact"
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
    </form>
  );
};

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentForm);
