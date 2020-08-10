import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Column from "../Column";
import AddColumnModal from "../Column/addModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { baseURL } from "../../config/settings";
import { getCall } from "../../apiCalls/apiCalls";
import ProjectToggle from "./projectToggle";
import GridList from '@material-ui/core/GridList';
import withScrolling from 'react-dnd-scrolling';
import Hidden from '@material-ui/core/Hidden';
import ProjectTeam from "./teamList"

const styles = (theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 15,
    alignItems: 'flex-start',
    height: '10%',
    minHeight: 45,
  },
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    height: "80%",
    justifyContent: 'left',
    border: "1px solid grey",
    padding: '20px 0',
    borderRadius: 4
  },
  projectMainDiv: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignContent: 'center',
  },
  addColumnButton: {
    margin: 10,
    width: '200px',
    height: '50px',
  },
  titleSection: {
    width: '60%',
    margin: 10,
  },
  smallSection: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '40%',
    padding: 10,
    justifyContent: 'space-evenly',
  },
});

const ScrollingComponent = withScrolling(GridList);
class Project extends React.Component {

  state = {
    project: {},
    columns: [],
    teamMembers: [],
    columnModalOpen: false,
    showColumns: false,
  };

  async componentWillMount() {
    this.getProject();
  }

  async componentWillUnmount() {
    this.state.showColumns = false;
  }

  getProject = () => {
    const { name } = this.props;
    const url = `${baseURL}/project/${name}`;
    console.log("get project", name);
    getCall(url)
      .then((response) => {
        console.log("in first promise");
        return response.json();
      })
      .then((data) => {
        console.log("fetch project success", data);
        const project = data.data[0];
        this.setState({ project });
        this.getTeamUserArray(project.team_id);
        this.getColumns(project.id);
        this.state.showColumns = true;
      })
      .catch((err) => {
        console.log("project fetch error", err)
        this.state.showColumns = true;
      });
  };

  getColumns = (projectId) => {
    const url = `${baseURL}/project/${projectId}/columns`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch columns success", data);
        this.setState({ columns: data.data });
      })
      .catch((err) => console.log("column fetch error", err));
  };

  getTeamUserArray = (team_id) => {
    console.log("getting team users for: ", team_id);
    const url = `${baseURL}/team/${team_id}/users`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch team success", data);
        this.setState({ teamMembers: data.data });
      })
      .catch((err) => console.log("column fetch error", err));
  };


  closeColumnModal = () => {
    const { project } = this.state;
    this.setState({ columnModalOpen: false });
    this.getColumns(project.id);
  };

  openColumnModal = () => {
    this.setState({ columnModalOpen: true });
  };

  render() {
    const { project, columns, teamMembers, columnModalOpen } = this.state;
    const { classes } = this.props;

    console.log("Project -> render -> project", project);
    return (
      <div className={classes.projectMainDiv}>
        <DndProvider backend={HTML5Backend}>
          <AddColumnModal
            isOpen={columnModalOpen}
            close={this.closeColumnModal}
            projectId={project?.id}
            order={columns.length || 0}
          />
          <div className={classes.header}>
            <div className={classes.titleSection}>
              <Typography noWrap variant="h4">
                {project.name}
              </Typography>
              <Typography variant="h6" className='hide-short'>
                {project.description}
              </Typography>
            </div>
            <div className={classes.smallSection}>
              <ProjectTeam teamMembers={teamMembers} teamId={project.team_id} reload={(id) => this.getTeamUserArray(id)}/>
            </div>
            <div className={classes.smallSection}>
              <ProjectToggle />
            </div>
          </div>

          <ScrollingComponent
            spacing={2}
            className={classes.root}
            direction="row"
          >
            {columns.map((c) => (
              <Column
                column={c}
                key={c.id}
                projectId={project.id}
                team={teamMembers}
                reload={this.getProject}
                width={300}
              />
            ))}
            {this.state.showColumns ? (
            <div>
              <Button
                className={classes.addColumnButton}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={this.openColumnModal}
              >
                Add Column
              </Button>
            </div>
            ) : (null)}
          </ScrollingComponent>
        </DndProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Project);
