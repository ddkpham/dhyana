import React, { useState, useEffect } from "react";
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
import CreateTeam from "./components/CreateTeams/index";
import SearchUser from "./components/SearchUser/index";
import ProfilePage from "./components/ProfilePage/index";
import MyProfile from "./components/MyProfile/index";
import EditProfile from "./components/EditProfile/index";
import Button from "@material-ui/core/Button";
import { clientBaseURL, baseURL } from "./config/settings";
import { getCall } from "./apiCalls/apiCalls";
import AppBar from "./components/AppBar";
import NewProject from "./components/Project/new";
import Project from "./components/Project/index";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";
import "./styles/styles.css";

// Simple auth

function App(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  console.log("App -> authenticated", authenticated);

  useEffect(() => {
    const checkSession = async () => {
      const url = `${baseURL}/login/sessionCheck`;
      const response = await getCall(url);
      const data = await response.json();
      console.log("checkSession -> data", data);
      const { confirmation } = data;
      if (confirmation === "success") {
        setAuthenticated(true);
      }
      setPageLoaded(true);
    };
    checkSession();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <AppBar />

          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          {pageLoaded ? (
            <div className="root">
              <Switch>
                <Route exact path="/">
                  {authenticated ? <Home /> : <Login />}
                </Route>
                <Route path="/createUser">{<CreateUser />}</Route>
                <Route path="/createTeam">{<CreateTeam />}</Route>
                <Route path="/myProfile">{<MyProfile />}</Route>
                <Route path="/editProfile">{<EditProfile />}</Route>
                <Route path="/searchUser">
                  {authenticated ? <SearchUser /> : <Login />}
                </Route>

                <Route
                  path="/user/:username"
                  render={(props) => {
                    const {
                      match: {
                        params: { username },
                      },
                    } = props;
                    if (authenticated) {
                      return <ProfilePage username={username} />;
                    }
                    return <Login />;
                  }}
                />

                <Route path="/home">
                  {authenticated ? <Home /> : <Login />}
                </Route>
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
          ) : null}
        </div>
      </Router>
    </ThemeProvider>
  );
}

// You can think of these components as "pages"
// in your app.
export default withRouter(App);
