import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import "./index.scss";
import { useHistory } from "react-router-dom";
import { postCall, getCall } from "../../apiCalls/apiCalls";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ProfilePage(props) {
  const classes = useStyles();
  const { username } = props;
  let history = useHistory();
  const [userInfo, setUser] = useState([]);
  const [teamInfo, showTeams] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [team_id, getTeamId] = useState("");

  console.log("Team id", team_id);
  console.log("user_id", userInfo.id);

  const addUserToTeam = async () => {
    const url = `${baseURL}/team/add-user`;
    const user_id = userInfo.id;
    const body = { team_id, user_id };

    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log(data);
    if (confirmation === "success") {
      alert(`Success: ${message}`);
      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert(`Error: ${message}`);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      var url = `${baseURL}/user/profile/${username}`;
      try {
        var response = await getCall(url);
        var payload = await response.json();
        const userData = payload.data[0];
        console.log("getUser -> userData", userData);
        setUser(userData);

        const { id } = userData;
        url = `${baseURL}/user/info/${id}`;
        response = await getCall(url);
        payload = await response.json();
        const { projects, teams } = payload.data;
        setUserProjects(projects);
        setUserTeams(teams);
        console.log("getUser -> payload", payload);
      } catch (err) {
        console.log("project fetch error", err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);

  useEffect(() => {
    function getTeams() {
      const url = `${baseURL}/team/all`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          showTeams(payload.data);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getTeams();
  }, []);

  useEffect(() => {
    console.log("teamInfo", teamInfo);
  }, [teamInfo]);

  return (
    <div>
      <div className="buttonDiv">
        <Button
          className="backButton"
          variant="outlined"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </div>

      <div className="profile-page-container">
        <div className="profileDiv">
          <h2 className="username">Username: {userInfo.username}</h2>
          <h2 className="name">First name: {userInfo.first_name}</h2>
          <h2 className="name">last name: {userInfo.last_name}</h2>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Team</InputLabel>
            <Select
              label="Team"
              onChange={(event) => {
                getTeamId(event.target.value);
              }}
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              {teamInfo.map((info) => (
                <MenuItem value={info.id} key={info.id}>
                  {info.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button variant="outlined" color="primary" onClick={addUserToTeam}>
              Add User to Team
            </Button>
          </div>
        </div>
        <div className="profileDiv">
          <Typography variant="h4" color="primary">
            Teams
          </Typography>
          <div className="profile-page-team-container">
            {userTeams.map((team) => {
              console.log("ProfilePage -> team", team);
              return (
                <Chip
                  color="primary"
                  avatar={<Avatar>{team.name.charAt(0)}</Avatar>}
                  label={team.name}
                  onClick={() => console.log("clicked")}
                  variant="outlined"
                />
              );
            })}
          </div>
          <Typography variant="h4" color="secondary">
            Projects
          </Typography>
          <div className="profile-page-team-container">
            {userProjects.map((project) => {
              console.log("ProfilePage -> project", project);
              return (
                <Chip
                  color="secondary"
                  avatar={<Avatar>{project.name.charAt(0)}</Avatar>}
                  label={project.name}
                  onClick={() => console.log("clicked")}
                  variant="outlined"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
