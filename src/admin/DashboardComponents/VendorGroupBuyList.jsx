import React, { useState, useEffect, Fragment, useCallback } from "react";
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
import Avatar from "@material-ui/core/Avatar";

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
    paddingTop: "56.25%", // 16:9
  },
}));

const VendorGroupBuyList = () => {
  const classes = useStyles();

  const [searchParams, setSearchParams] = useState({
    search: null,
    page: 1,
    pagesize: 6,
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
          pagesize: 6,
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
    debounce((searchTerm) => {
      setLoading(true);
      Auth.client
        .get("/groupbuys", {
          params: searchParams,
        })
        .then((res) => {
          console.log(res);
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
    debouncedSearch(searchTerm);
  };

  const handleSort = (sortVal) => {
    setSearchParams({
      ...searchParams,
      approved: sortVal,
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
      ) : (
        <Grid className={classes.root} container spacing={3} justify="space-evenly">
          {groupbuys &&
            groupbuys.flatMap((gb) => (
              <Grid key={gb.gb_id} item xs={12} sm={8} md={6} lg={4}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    title={gb.recipe.recipe_name}
                    subheader={getDateString(gb.recipe.date_created)}
                  />
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </Fragment>
  );
};

export default VendorGroupBuyList;
