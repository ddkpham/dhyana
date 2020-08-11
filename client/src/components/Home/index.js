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
import EmptyHomeCard from "./EmptyHomeCard/";

import "./index.scss";

const styles = (theme) => ({
  homeRoot: {
    padding: 5,
  },
  mainWrapper: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    overflowX: 'scroll',
  },
  mainCard: {
    width: 350,
    minWidth: 350,
    minHeight: 600,
  },
  title: {
    textAlign: "center",
    width: "25%",
  },
  projectsTitle: {
    width: "75%",
    textAlign: "center",
  },
  headerDiv: {
    width: "100%",
    display: "flex",
  },
  buttonDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  teamsColumn: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  projectsColumn: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "green",
    overflowX: "scroll",
  }
});

class Home extends React.Component {
  state = {
    projects: [],
    teams: [],
    columns: [],
    showContent: false,
  };
  async componentWillMount() {
    this.getTeams();
    this.getProjects();
  }

  getProjects = () => {
    const url = `${baseURL}/project/user-specific/all`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("projects", data);
        this.setState({ projects: data.data }, 
          () => {this.teamColumns()});
      })
      .catch((err) => console.log("project fetch error", err));
  };

  getTeams = () => {
    const url = `${baseURL}/team/all`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("teams", data);
        this.setState({ teams: data.data }, 
          () => {this.getProjects()});
      })
      .catch((err) => {
        this.setState({ showContent: true })
        console.log("project fetch error", err)
      });
  };

  teamColumns = () => {    
    console.log("entered teamRows constructor")
    console.log("this.state.teams.length is: ", this.state.teams.length)
    console.log("this.state.projects.length is: ", this.state.projects.length)
    for (var i=0; i < this.state.teams.length; i++) {
      var teamColumn = []
      const team = this.state.teams[i]
      console.log("team is: ", team)
      teamColumn.push(<TeamCard style={{width: 100, height: 150}} name={team.name} id={team.id} />)

      for (var j=0; j < this.state.projects.length; j++) {
        const project = this.state.projects[j]
        if (team.id === project.team_id) {
          teamColumn.push(<ProjectCard key={project.id} project={project} team={team.name} />)
        }
      }

      var columns = this.state.columns
      columns.push(teamColumn)
      this.setState({ columns: columns })
    }
  }

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
          
          {this.state.showContent  ? (
          <div className={classes.buttonDiv}>
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
              ) : (null)
            }
          </div>
          ) : (null)}

          <div className="empty-projects-container">
            {this.state.teams.length === 0 && this.state.showContent  ? <EmptyHomeCard /> : null}
          </div>

          <div className={classes.mainWrapper}>
            {this.state.columns.map((column) => (
              <Card className={classes.mainCard}>{column}</Card>
            ))}
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
