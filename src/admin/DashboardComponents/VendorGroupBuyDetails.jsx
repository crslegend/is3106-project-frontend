import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Auth from "../../AxiosService";
import { getDateString, formatDateForBackend } from "../../utils";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
  },
  root: {
    flexGrow: 1,
    marginTop: "10px",
    textAlign: "left",
  },
  media: {
    height: 0,
    paddingTop: "45.25%", // 16:9
  },
  error: {
    color: "#e81a1a",
  },
  progress: {
    color: "#1aa3e8",
  },
  success: {
    color: "#24e81a",
  },
  textField: {
    width: "220px",
    marginTop: "2px",
  },
  button: {
    minWidth: "250px",
  },
}));

const VendorGroupBuyDetails = ({ setSbOpen, snackbar, setSnackbar }) => {
  const { id } = useParams();

  const classes = useStyles();

  const [groupbuy, setGroupbuy] = useState();
  const [loading, setLoading] = useState(true);

  const [approvalDetails, setApprovalDetails] = useState({
    minimum_order_quantity: "",
    order_by: new Date(),
    final_price: "",
    delivery_fee: "",
  });

  const [approvalDetailsErrors, setApprovalDetailsErrors] = useState({
    minimum_order_quantity: false,
    order_by: false,
    final_price: false,
    delivery_fee: false,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    Auth.client
      .get(`/groupbuys/${id}`)
      .then((res) => {
        console.log(res);
        setGroupbuy(res.data);
        setApprovalDetails({
          minimum_order_quantity: res.data.minimum_order_quantity || "",
          order_by: new Date(res.data.order_by) || "",
          final_price: res.data.final_price || "",
          delivery_fee: res.data.delivery_fee || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);

    // update
    await Auth.client
      .put(`/groupbuys/${id}`, {
        minimum_order_quantity: parseInt(approvalDetails.minimum_order_quantity),
        order_by: formatDateForBackend(approvalDetails.order_by),
        final_price: parseFloat(approvalDetails.final_price),
        delivery_fee: parseFloat(approvalDetails.delivery_fee),
      })
      .then((res) => {
        console.log(res);
        Auth.client
          .patch(`/groupbuys/${id}`)
          .then((res) => {
            // console.log(res);
            setSnackbar({
              ...snackbar,
              message: "Groupbuy Approved!",
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

    // get new update
    await Auth.client
      .get(`/groupbuys/${id}`)
      .then((res) => {
        console.log(res);
        setGroupbuy(res.data);
        setApprovalDetails({
          minimum_order_quantity: res.data.minimum_order_quantity,
          order_by: new Date(res.data.order_by),
          final_price: res.data.final_price,
          delivery_fee: res.data.delivery_fee,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const validateInput = () => {
    setApprovalDetailsErrors({
      minimum_order_quantity: approvalDetails.minimum_order_quantity === "",
      order_by: approvalDetails.order_by < new Date(),
      final_price: approvalDetails.final_price === "",
      delivery_fee: approvalDetails.delivery_fee === "",
    });

    if (
      approvalDetails.minimum_order_quantity === "" ||
      approvalDetails.final_price === "" ||
      approvalDetails.delivery_fee === "" ||
      approvalDetails.order_by < new Date()
    ) {
      setSnackbar({
        ...snackbar,
        message: "Check your values",
        severity: "error",
      });
      setSbOpen(true);
      return;
    }

    setDialogOpen(true);
  };

  return (
    <Fragment>
      <Typography align="left" variant="h4">
        Group Buy Details
      </Typography>
      {groupbuy && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ height: "100%" }}>
                <CardHeader
                  title={groupbuy.recipe.recipe_name}
                  subheader={"Submitted " + getDateString(groupbuy.recipe.date_created)}
                />
                <CardMedia className={classes.media} image={groupbuy.recipe.photo_url} />
                <CardContent>
                  <Typography
                    variant="h5"
                    className={
                      groupbuy.status === "GROUPBUY_EXPIRED"
                        ? classes.error
                        : groupbuy.status === "DELIVERED"
                        ? classes.success
                        : classes.progress
                    }
                  >
                    {groupbuy.status.replace("_", " ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <b>Expected Fulfillment Date:</b> {getDateString(groupbuy.fulfillment_date)}
                    <br />
                    <b>Estimated Price:</b> ${groupbuy.recipe.estimated_price_start} -{" "}
                    {groupbuy.recipe.estimated_price_end}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={8} alignItems="stretch">
              <Card style={{ height: "100%" }}>
                <CardHeader title="Approve Group Buy" subheader="Edit the details here to approve groupbuy" />
                <CardContent style={{ padding: "0 16px" }}>
                  <FormControl>
                    <TextField
                      className={classes.textField}
                      label="Minimum Order Quantity"
                      type="number"
                      error={approvalDetailsErrors.minimum_order_quantity}
                      value={(approvalDetails && approvalDetails.minimum_order_quantity) || ""}
                      onChange={(event) =>
                        setApprovalDetails({
                          ...approvalDetails,
                          minimum_order_quantity: event.target.value,
                        })
                      }
                    />
                    <TextField
                      className={classes.textField}
                      label="Final Price (SGD)"
                      type="number"
                      error={approvalDetailsErrors.final_price}
                      value={(approvalDetails && approvalDetails.final_price) || ""}
                      onChange={(event) =>
                        setApprovalDetails({
                          ...approvalDetails,
                          final_price: event.target.value,
                        })
                      }
                    />
                    <TextField
                      className={classes.textField}
                      label="Delivery Fee (SGD)"
                      type="number"
                      error={approvalDetailsErrors.delivery_fee}
                      value={(approvalDetails && approvalDetails.delivery_fee) || ""}
                      onChange={(event) =>
                        setApprovalDetails({
                          ...approvalDetails,
                          delivery_fee: event.target.value,
                        })
                      }
                    />
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Order Deadline"
                      format="yyyy-MM-dd"
                      error={approvalDetailsErrors.order_by}
                      value={approvalDetails.order_by}
                      onChange={(date) =>
                        setApprovalDetails({
                          ...approvalDetails,
                          order_by: date,
                        })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </FormControl>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={groupbuy.status !== "PENDING_APPROVAL"}
                    onClick={validateInput}
                    loading={loading}
                  >
                    Approve
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ingredient ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Retail Price (SGD)</TableCell>
                      <TableCell align="right">Estimated Price (SGD)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupbuy.recipe.ingredients.map((ing) => (
                      <TableRow key={ing.ing_id}>
                        <TableCell component="th" scope="row">
                          {ing.foreign_id}
                        </TableCell>
                        <TableCell>{ing.ing_name}</TableCell>
                        <TableCell>{ing.category}</TableCell>
                        <TableCell align="right">{ing.quantity}</TableCell>
                        <TableCell align="right">{ing.selling_price}</TableCell>
                        <TableCell align="right">{ing.estimated_price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Group buy cannot be changed once approved. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              setDialogOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default VendorGroupBuyDetails;
