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
import Contact from "./components/Contact/index";
import NewContact from "./components/NewContact/index";
import CreateUser from "./components/CreateUser/index";
import Button from "@material-ui/core/Button";
import { clientBaseURL } from "./config/settings";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/ProjectBoard/Header";
import ProjectBoard from "./components/ProjectBoard";

// Simple auth
var authenticated = localStorage.getItem("auth-token");
console.log("authenticated", authenticated);

function App(props) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/contact/new">New Contact</Link>
          </li>
          <li>
            <Link to="/contact">contact</Link>
          </li>
          <li>
            <Link to="/createUser">Create User</Link>
          </li>
          <li>
            <Button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.href = `${clientBaseURL}`;
              }}
            >
              Log out
            </Button>
          </li>
        </ul>

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
          <Route path="/home">{authenticated ? <Home /> : <Login />}</Route>
          <Route path="/contact/new">
            {authenticated ? <NewContact /> : <Login />}
          </Route>
          <Route
            path="/contact/:first_name/:last_name"
            render={(props) => {
              const {
                match: {
                  params: { first_name, last_name },
                },
              } = props;
              if (authenticated) {
                return (
                  <Contact first_name={first_name} last_name={last_name} />
                );
              }
              return <Login />;
            }}
          />
          <Route path="/project">
            <DndProvider backend={HTML5Backend}>
              <Header />
              <ProjectBoard />
            </DndProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
export default withRouter(App);
