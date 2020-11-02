import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { debounce } from "lodash";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import Auth from "../../AxiosService";
import { getDateString } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
    textAlign: "left",
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  loading: {
    width: "100%",
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    marginTop: "10px",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    textAlign: "left",
  },
  search: {
    maxWidth: 180,
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
}));

const VendorGroupBuyList = () => {
  const classes = useStyles();

  const [searchParams, setSearchParams] = useState({
    search: null,
    page: 1,
    upcoming: 1,
  });

  const [groupbuys, setGroupbuys] = useState();
  const [loading, setLoading] = useState(false);

  // initial fetch
  useEffect(() => {
    setLoading(true);
    Auth.client
      .get("/groupbuys", {
        params: {
          upcoming: 1,
        },
      })
      .then((res) => {
        setGroupbuys(res.data.results);
        setLoading(false);
        console.log(res);
      });
  }, []);

  // delay search by 500ms
  const debouncedSearch = useCallback(
    debounce((params) => {
      setLoading(true);
      Auth.client
        .get("/groupbuys", {
          params: params,
        })
        .then((res) => {
          setGroupbuys(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, 500),
    []
  );

  // method to handle search
  const handleSearch = (searchTerm) => {
    setSearchParams({
      ...searchParams,
      search: searchTerm,
    });

    if (searchTerm && searchTerm !== "") {
      debouncedSearch({
        ...searchParams,
        search: searchTerm,
      });
    }
  };

  const handleSort = (sortVal) => {
    setLoading(true);
    setSearchParams({
      ...searchParams,
      approved: sortVal === "" ? 0 : sortVal,
    });
    Auth.client
      .get("/groupbuys", {
        params: {
          ...searchParams,
          approved: sortVal === "" ? 0 : sortVal,
        },
      })
      .then((res) => {
        setGroupbuys(res.data.results);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <div className={classes.title}>
        <Typography align="left" variant="h4">
          Group Buys
        </Typography>
        <div>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            margin="dense"
            value={searchParams.search}
            className={classes.search}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <FormControl variant="outlined" margin="dense" className={classes.formControl}>
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              id="sort"
              label="Sort"
              value={searchParams.approved}
              defaultValue=""
              onChange={(event) => handleSort(event.target.value)}
            >
              <MenuItem value="">
                <em>select a value</em>
              </MenuItem>
              <MenuItem value={1}>Approved</MenuItem>
              <MenuItem value={-1}>Pending Approval</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : groupbuys && groupbuys.length > 0 ? (
        <Grid className={classes.root} container spacing={3}>
          {groupbuys &&
            groupbuys.flatMap((gb) => (
              <Grid key={gb.gb_id} item xs={12} sm={6} lg={4}>
                <Card>
                  <CardHeader
                    title={gb.recipe.recipe_name}
                    subheader={"Submitted " + getDateString(gb.recipe.date_created)}
                  />
                  <CardMedia className={classes.media} image={gb.recipe.photo_url} />
                  <CardContent>
                    <Typography
                      variant="h5"
                      className={
                        gb.status === "GROUPBUY_EXPIRED"
                          ? classes.error
                          : gb.status === "DELIVERED"
                          ? classes.success
                          : classes.progress
                      }
                    >
                      {gb.status.replace("_", " ")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <b>Expected Fulfillment Date:</b> {getDateString(gb.fulfillment_date)}
                      <br />
                      <b>Estimated Price:</b> ${gb.recipe.estimated_price_start} - {gb.recipe.estimated_price_end}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      component={Link}
                      to={`dashboard/groupbuy/${gb.gb_id}`}
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      ) : (
        <div className={classes.loading} style={{ alignItems: "flex-start" }}>
          <Typography variant="body2" color="textSecondary" component="p">
            No Results Found.
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default VendorGroupBuyList;
