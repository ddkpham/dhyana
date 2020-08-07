import { baseURL } from "../../config/settings";
import React, { useState, useEffect, Fragment } from "react";
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

          const teamId = payload.data.projects[0].team_id;
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
      
      <div className="container">
        <div className="profileDiv">
            <Typography variant="h4" color="primary">
                {name}
            </Typography>
            <div className="usersContainer">
            <Typography variant="h5" color="primary">
                Users
            </Typography>
            {TeamUsers.map((user) => {
              console.log("TeamPage -> team", user);
              return (
                <Chip
                  color="secondary"
                  avatar={<Avatar>
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}</Avatar>}
                  label={user.first_name + " " + user.last_name}
                  onClick={() => console.log("clicked")}
                  variant="outlined"
                />
              );
            })}
            </div>
            <Typography variant="h5" color="primary">
                Projects
            </Typography>
            <div className="home-projects-wrapper">
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