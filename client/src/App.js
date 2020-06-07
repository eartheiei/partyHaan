import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./pages/login"
import Register from "./pages/register"
import Dashborad from "./pages/dashboard"
import Party from "./pages/party"

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/dashborad" component={Dashborad}/>
          <Route path="/party" component={Party}/>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </div>
      </Router>
    )
  }
}