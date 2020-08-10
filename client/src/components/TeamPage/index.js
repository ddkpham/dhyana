import { baseURL } from "../../config/settings";
import React, { useState, useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { images } from "../../static/finalspace/avatars";

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
            <div className="team-page-center">
                <div>
                    <Typography variant="h4" color="primary">
                        {name}
                    </Typography>
                    <Typography variant="h5" color="secondary">
                        Team Members
                    </Typography>
                    <div className="profile-flex-div">
                        {TeamUsers.map((user) => {
                        console.log("TeamPage -> team", user);
                        let nameExists = true;
                        let imgIndex = Math.floor(Math.random() * images.length);
                        if (user.first_name === null || user.last_name === null)
                        {
                            nameExists = false;
                        }
                        return (
                            <Card className="team-profileDiv">
                            <CardContent>
                                <div className="team-profile-container-width">
                                <div className="team-profile-container-center">
                                    <Avatar
                                        alt={user.username}
                                        src={images[imgIndex]}
                                        className="profiles-avatar"
                                    />
                                    <Typography className="profile-name" variant="h5" color="primary">
                                        {user.first_name || "John"}{" "}
                                        {user.last_name || "Doe"}
                                    </Typography>
                                    <Typography className="profile-name" variant="h6" color="primary">
                                        @{user.username}
                                    </Typography>
                                </div>
                                </div>
                            </CardContent>
                            </Card>  
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="team-page-center">
                <div>
                    <Typography variant="h5" color="secondary">
                        Projects
                    </Typography>
                    <div className="team-projects-container">
                        <Fragment>
                          <div className="disabled">
                            {TeamInfo.map((project) =>
                                <ProjectCard key={project.id} project={project} team="" />
                            )}
                          </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;