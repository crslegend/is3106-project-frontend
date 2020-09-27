import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";
import useForm from "./UseForm";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  field: {
    borderRadius: "50px",
    padding: theme.spacing(1, 2),
    "& label": {
      fontSize: 15,
      padding: "8px 10px",
      [theme.breakpoints.down("md")]: {
        fontSize: 10,
        padding: "10px 8px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 7,
        padding: "12px 5px",
      },
    },
    inputs: {
      height: "100px",
    },
  },
});

const initialValues = {
  deliveryaddress: "",
  addressOne: "",
  addressTwo: "",
  postal: "",
  quantity: "1",
  mobile: "+65 XXXX XXXX",
  payment: "CARD",
};

const PaymentForm = (props) => {
  const { classes } = props;
  const { values, handleInputChange } = useForm(initialValues);

  return (
    <form>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <TextField
            fullWidth="true"
            type="text"
            margin="dense"
            variant="outlined"
            name="deliveryaddress"
            className={classes.field}
            label="Select Delivery Address"
            value={values.deliveryaddress}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="addressOne"
            className={classes.field}
            label="Address Line 1"
            value={values.addressTwo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="addressTwo"
            className={classes.field}
            label="Address Line 2"
            value={values.addressTwo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="postal"
            className={classes.field}
            label="Postal Code"
            value={values.postal}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="deliveryaddress"
            className={classes.field}
            label="Select Delivery Address"
            value={values.deliveryaddress}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="addressOne"
            className={classes.field}
            label="Address Line 1"
            value={values.addressTwo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="addressTwo"
            className={classes.field}
            label="Address Line 2"
            value={values.addressTwo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth="true"
            margin="dense"
            variant="outlined"
            name="postal"
            className={classes.field}
            label="Postal Code"
            value={values.postal}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentForm);
