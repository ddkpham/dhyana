import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { baseURL, clientBaseURL } from "../../config/settings";
import ProjectCard from "../Project/card";
import TeamCard from "./TeamCard";
import { getCall } from "../../apiCalls/apiCalls";

import "./index.scss";

const styles = (theme) => ({
  homeRoot: {
    padding: "5px",
  },
  projectWrapper: {
    display: "inline-block",
  },
});

class Home extends React.Component {
  state = {
    projects: [],
    teams: [],
  };
  async componentDidMount() {
    this.getProjects();
    this.getTeams();
  }

  getProjects = () => {
    const url = `${baseURL}/project/all`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("projects", data);
        this.setState({ projects: data.data });
      })
      .catch((err) => console.log("project fetch error", err));
  };

  getTeams = () => {
    const url = `${baseURL}/team/all`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("teams", data);
        this.setState({ teams: data.data });
      })
      .catch((err) => console.log("project fetch error", err));
  };

  render() {
    const { projects, teams } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.homeRoot}>
        <div className={classes.projectWrapper}>
          <Typography variant="h4" color="primary">
            Dashboard
          </Typography>

          <div className="home-content-wrapper">
            <div className="home-teams">
              <Typography variant="h4" color="secondary">
                Teams
              </Typography>
              {teams.map((team) => (
                <TeamCard name={team.name} id={team.id} />
              ))}
            </div>
            <div className="home-projects-container">
              <Typography variant="h4" color="secondary">
                Projects
              </Typography>
              <div className="home-projects-wrapper">
                {teams.map((t) => (
                  <Fragment>
                    {projects.map((p) =>
                      t.id === p.team_id ? (
                        <ProjectCard key={p.id} project={p} team={t.name} />
                      ) : null
                    )}
                  </Fragment>
                ))}
              </div>
              <Card raised className="home-project-add-btn">
                <CardActionArea href={"/project/new"}>
                  <CardContent>
                    <Typography variant="h5" color="textSecondary">
                      <AddIcon />
                      Add Project
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
