import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { baseURL } from "../../config/settings";
import ProjectCard from "../Project/card";
import TeamCard from "./TeamCard";
import { getCall } from "../../apiCalls/apiCalls";
import EmptyCard from "../EmptyCard";

import "./index.scss";

const styles = (theme) => ({
  homeRoot: {
    padding: 5,
  },
  mainWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    // backgroundColor: "blue",
    height: "100%",
  },
  title: {
    textAlign: "center",
  },
  teamsColumn: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "grey",
    height: "100%",
  },
  projectsColumn: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "green",
    height: "100%",
  }
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
    const url = `${baseURL}/project/user-specific/all`;
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
    const userProjects = projects.filter((p) => {
      return teams.some((team) => team.id == p.team_id);
    });
    const noProjects = userProjects.length === 0;
    console.log("Home -> render -> noProjects", noProjects);
    const { classes } = this.props;

    return (
      <div className={classes.homeRoot}>
        <Typography variant="h4" color="primary" gutterBottom>
          Dashboard
        </Typography>
        <div className={classes.mainWrapper}>
          

            <div className={classes.teamsColumn}>
              <Typography
                variant="h4"
                color="secondary"
                className={classes.title}
              >
                Teams
              </Typography>

              {teams.map((team) => (
                <TeamCard name={team.name} id={team.id} />
              ))}


              {teams.map((t) => (
                <Fragment>
                  {projects.map((p) =>
                    t.id === p.team_id ? (
                      <ProjectCard key={p.id} project={p} team={t.name} />
                    ) : null
                  )}
                </Fragment>
              ))}
              <div>
                <Card raised className="home-project-add-btn">
                  <CardActionArea href={"/create-team"}>
                    <CardContent>
                      <Typography variant="h5" color="textSecondary">
                        <AddIcon />
                        Add Team
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>



                

              <div className={classes.projectsColumn}>

                <Typography
                  variant="h4"
                  color="secondary"
                  className={userProjects.length === 1 ? "" : classes.title}
                >
                  Projects
                </Typography>

                <div className="empty-projects-container">
                  {noProjects ? <EmptyCard /> : null}
                </div>

                {this.state.teams.length >= 1 ? (
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
                ) : (null)}
              </div>
            
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
