import { baseURL } from "../../config/settings";
import React, { useState, useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import "./index.scss";
import ProjectCard from "../Project/card";
import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";


function TeamPage(props) {
  let history = useHistory();
  const [TeamInfo, setTeamInfo] = useState([]);
  const { name } = props;
  const [TeamUsers, getTeamUsers] = useState([]);
  console.log("TeamUsers", TeamUsers);

  useEffect(() => {
    function getTeam() {
      console.log("GET from", `${baseURL}/team/${name}`);
      const url = `${baseURL}/team/${name}`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          setTeamInfo(payload.data.projects);

          const teamId = payload.data.id;
          const userUrl = `${baseURL}/team/${teamId}/users`;
          getCall(userUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log("user info", data);
                getTeamUsers(data.data);
            })
            .catch((err) => console.log("project fetch error", err));
        })
        .catch((err) => console.log("team fetch error", err));
    }
    getTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("TeamInfo", TeamInfo);
  }, [TeamInfo]);

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
      
      <div className="outer-team-page-container">
        <div className="inner-team-page-container">
            <Typography variant="h4" color="primary">
                {name}
            </Typography>
            <div className="usersContainer">
            <Typography variant="h5" color="primary">
                Team Members
            </Typography>
            {TeamUsers.map((user) => {
              console.log("TeamPage -> team", user);
              let nameExists = true;
              if (user.first_name === null || user.last_name === null)
              {
                  nameExists = false;
              }
              return (
                <Chip
                  color="secondary"
                  avatar={nameExists ? <Avatar>
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}</Avatar>:
                      <Avatar>
                      {user.username.charAt(0)}
                      {user.username.charAt(1)}</Avatar>}
                  label=
                  {nameExists ? user.first_name + " " + user.last_name: user.username}
                  onClick={() => console.log("clicked")}
                  variant="outlined"
                />
              );
            })}
            </div>
            <Typography variant="h5" color="primary">
                Projects
            </Typography>
            <div className="team-projects-container">
                <Fragment>
                {TeamInfo.map((project) =>
                    <ProjectCard key={project.id} project={project} team="" />
                )}
                </Fragment>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;