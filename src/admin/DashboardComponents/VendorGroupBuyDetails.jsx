import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
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

import Auth from "../../AxiosService";
import { getDateString } from "../../utils";

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
}));

const VendorGroupBuyDetails = () => {
  const { id } = useParams();

  const classes = useStyles();

  const [groupbuy, setGroupbuy] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Auth.client
      .get(`/groupbuys/${id}`)
      .then((res) => {
        // console.log(res);
        setGroupbuy(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <Fragment>
      <Typography align="left" variant="h4">
        Group Buy Details
      </Typography>
      {groupbuy && (
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar} src={groupbuy.recipe.owner.profile_photo_url}>
                    R
                  </Avatar>
                }
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

          <Grid item xs={12} md={8}>
            Some text fields
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
      )}
    </Fragment>
  );
};

export default VendorGroupBuyDetails;
