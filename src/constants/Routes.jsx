import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../modules/pages/LandingPage";

export default class Routes extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </Router>
      </>
    );
  }
}
