import { baseURL } from "../../config/settings";
import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';

import "./index.scss";
import ProjectCard from "../Project/card";
import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";


function TeamPage(props) {
  let history = useHistory();
  const [TeamInfo, setTeamInfo] = useState([]);
  const { name } = props;
  console.log("team", name);
  console.log("projects", TeamInfo)

  useEffect(() => {
    function getTeam() {
      console.log("GET from", `${baseURL}/team/${name}`);
      const url = `${baseURL}/team/${name}`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          setTeamInfo(payload.data.projects);
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
            <Typography variant="h5" color="secondary">
                Projects
            </Typography>
            <div className="home-projects-wrapper">
                <Fragment>
                {TeamInfo.map((project) =>
                    <ProjectCard key={project.id} project={project} team="" />
                )}
                </Fragment>
            </div>
            {/* <List dense="false">
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Single-line item"
                    secondary=""
                  />
                </ListItem>
            </List> */}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;