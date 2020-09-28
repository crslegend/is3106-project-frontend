import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";
import useForm from "./UseForm";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    "& input": {
      backgroundColor: "white",
      borderRadius: "10px",

      textAlign: "center",
      fontSize: 15,
      padding: "8px 10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 10,
        padding: "8px 1px",
      },
    },
    "& Option": {
      fontSize: 15,
      [theme.breakpoints.down("sm")]: {
        fontSize: 10,
      },
    },
    "& Select": {
      backgroundColor: "white",
      borderRadius: "10px",
      fontSize: 15,
      padding: "8px 10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 13,
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
      fontSize: 15,
      padding: "8px 10px",
      marginLeft: "10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
        padding: "8px 1px",
        marginLeft: "5px",
      },
    },
  },
});

const initialValues = {
  deliveryaddress: " ",
  addressOne: " ",
  addressTwo: " ",
  postal: " ",
  quantity: "1",
  mobile: "+65 ",
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
  const { classes } = props;
  const { values, handleInputChange } = useForm(initialValues);

  const [payment, setPayment] = React.useState("CARD");

  const handleChange = (event) => {
    setPayment(event.target.value);
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
            value={values.quantity}
            onChange={handleInputChange}
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
            value={values.mobile}
            onChange={handleInputChange}
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
    </form>
  );
};

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentForm);
