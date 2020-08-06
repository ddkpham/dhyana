import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Column from "../Column";
import AddColumnModal from "../Column/addModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withScrolling from 'react-dnd-scrolling';
import { baseURL } from "../../config/settings";
import { getCall } from "../../apiCalls/apiCalls";
import ProjectToggle from "./projectToggle";
import GridList from '@material-ui/core/GridList';


const styles = (theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    height: "100%",
    minHeight: "95%",
    width: "95%",
    justifyContent: 'left',
    border: "1px solid grey",
    paddingTop: 20, 
    margin: 20,
    borderRadius: 4,
    justify: "center",
  },
  projectMainDiv: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  projectTitle: {
    justifyContent: "center",
    display: 'flex',
  },
  addColumnButton: {
    marginLeft: 20,
    marginBottom: 20,
  },
  projectToggle: {
    textAlign: 'left',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
  }
});

const ScrollingComponent = withScrolling(Grid);
class Project extends React.Component {

  state = {
    project: {},
    columns: [],
    teamMembers: [],
    columnModalOpen: false,
  };

  async componentDidMount() {
    this.getProject();
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
      })
      .catch((err) => console.log("project fetch error", err));
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
    const response = getCall(url)
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

          <div className={classes.projectToggle}>
            <ProjectToggle />
          </div>

          <div className={classes.headerText}>
            <Typography variant="h3" gutterBottom className={classes.projectTitle}>
              {project.name}
            </Typography>
            <Typography variant="h6" gutterBottom className={classes.projectTitle}>
              {project.description}
            </Typography>
          </div>

          <Button className={classes.addColumnButton} variant="outlined" startIcon={<AddIcon />} onClick={this.openColumnModal}>
            Add Column
          </Button>
          
          <GridList container spacing={2} className={classes.root} 
            container spacing={3} 
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
          </GridList>
        </DndProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Project);
