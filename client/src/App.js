import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Home from "./components/Home/index";
import Login from "./components/Login/index";
import CreateUser from "./components/CreateUser/index";
import SearchUser from "./components/SearchUser/index";
import Button from "@material-ui/core/Button";
import { clientBaseURL } from "./config/settings";
import AppBar from "./components/AppBar";
import NewProject from "./components/Project/new";
import Project from "./components/Project/index";
// Simple auth
var authenticated = localStorage.getItem("auth-token");
authenticated = true;
console.log("authenticated", authenticated);

function App(props) {
  return (
    <Router>
      <div>
        {/*
        createUser still needs to be added 
            <li>
              <Link to="/createUser">Create Account</Link>
            </li>
          )}
*/}
        <AppBar />

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            {authenticated ? <Home /> : <Login />}
          </Route>
          <Route path="/createUser">{<CreateUser />}</Route>
          <Route path="/searchUser">{<SearchUser />}</Route>
          <Route path="/home">{authenticated ? <Home /> : <Login />}</Route>
          <Route path="/project/new">
            {authenticated ? <NewProject /> : <Login />}
          </Route>
          <Route
            path="/project/:name"
            render={(props) => {
              const {
                match: {
                  params: { name },
                },
              } = props;
              if (authenticated) {
                return <Project name={name} />;
              }
              return <Login />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
export default withRouter(App);
