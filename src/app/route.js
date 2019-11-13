import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Me from "./me";

export const Routing = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" children={<Home Link={Link} />} />
          <Route
            path="/login"
            children={<Login Link={Link} useHistory={useHistory} />}
          />
          <Route
            path="/register"
            children={<Register Link={Link} useHistory={useHistory} />}
          />
          <Route
            path="/me"
            children={<Me Link={Link} useHistory={useHistory} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

