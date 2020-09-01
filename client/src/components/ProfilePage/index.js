import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import "./index.scss";
import { images } from "../../static/finalspace/avatars";
import { team_images } from "../../static/teams/teamImages";
import { useHistory } from "react-router-dom";
import { postCall, getCall } from "../../apiCalls/apiCalls";

import EmptyCard from "./EmptyCard";

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
  const imgIndex = Math.floor(Math.random() * images.length);
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
      // window.location.href = `${clientBaseURL}/home`;
      history.push("/home");
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
  }, [username]);

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
        <Card className="profileDiv">
          <CardContent>
            <div className="centerProfile">
              <Avatar
                alt={username}
                src={images[imgIndex]}
                className="profile-my-avatar"
              />
              <Typography variant="h5" color="primary">
                {userInfo.first_name || "John"} {userInfo.last_name || "Doe"}
              </Typography>
              <Typography variant="h6" color="secondary">
                @{userInfo.username}
              </Typography>
              {userInfo.job_title ? (
                <Typography variant="h6" color="secondary">
                  Job Title: {userInfo.job_title}
                </Typography>
              ) : null}
              <TextField
                disabled
                rowsMax={5}
                label="Biography"
                multiline
                variant="outlined"
                rows={4}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                defaultValue={"Nothing here yet."}
                value={userInfo.biography}
              />
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addUserToTeam}
                >
                  Add User to Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="project-teams-container">
          <CardContent>
            <Typography variant="h4" color="primary">
              Teams
            </Typography>
            <div className="profile-page-team-container">
              {userTeams.length > 0 ? (
                <div>
                  {userTeams.map((team) => {
                    console.log("ProfilePage -> team", team);
                    let imgIndex = Math.floor(
                      Math.random() * team_images.length
                    );
                    console.log("imgIndex", imgIndex);
                    return (
                      <Card
                        raised
                        onClick={() => {
                          history.push("/team/" + team.name);
                        }}
                      >
                        <CardContent className="team-card-container">
                          <CardMedia
                            className="teamcard-image"
                            image={team_images[imgIndex]}
                            title="Live from space album cover"
                          />
                          <div className="teamcard-div">
                            <CardActionArea>
                              <Typography variant="h5" color="primary">
                                {team.name}
                              </Typography>
                            </CardActionArea>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <EmptyCard />
                </div>
              )}
            </div>
            <Typography
              className="project-title"
              variant="h4"
              color="secondary"
            >
              Projects
            </Typography>
            <div className="profile-page-team-container">
              {userTeams.length > 0 ? (
                <div>
                  {userProjects.map((project) => {
                    console.log("ProfilePage -> project", project);
                    let projectImgIndex = Math.floor(
                      Math.random() * team_images.length
                    );
                    return (
                      <Card raised>
                        <CardContent className="team-card-container">
                          <CardMedia
                            className="teamcard-image"
                            image={team_images[projectImgIndex]}
                            title="Live from space album cover"
                          />
                          <div className="teamcard-div">
                            <CardActionArea>
                              <Typography variant="h5" color="primary">
                                {project.name}
                              </Typography>
                            </CardActionArea>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <EmptyCard />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
