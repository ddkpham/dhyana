import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Column from "../Column";
import AddColumnModal from "../Column/addModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { baseURL, clientBaseURL } from "../../config/settings";
import { getCall, postCall } from "../../apiCalls/apiCalls";
import Chip from "@material-ui/core/Chip";
import ProjectToggle from "./projectToggle";
import GridList from "@material-ui/core/GridList";
import withScrolling from "react-dnd-scrolling";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Hidden from "@material-ui/core/Hidden";
import ProjectTeam from "./teamList";
import ConfirmDialog from "../ConfirmDialog";
import EmptyCard from "../EmptyCard";
import { red, cyan, grey } from "@material-ui/core/colors";

const styles = (theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
  },
  headerButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    alignItems: "flex-start",
    height: "10%",
    minHeight: 45,
    marginBottom: 5,
  },
  root: {
    display: "flex",
    flexWrap: "nowrap",
    height: "80%",
    justifyContent: "left",
    border: "1px solid grey",
    padding: "20px 0",
    borderRadius: 4,
  },
  projectMainDiv: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  addColumnButton: {
    margin: 10,
    width: "200px",
    height: "50px",
  },
  titleSection: {
    width: "60%",
    margin: 10,
  },
  smallSection: {
    display: "flex",
    flexWrap: "wrap",
    width: "40%",
    padding: 10,
    justifyContent: "space-evenly",
  },
  smallSectionProject: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-evenly",
  },
  deleteButton: {
    color: "red",
    borderColor: "red",
    [theme.breakpoints.down("sm")]: {
      "& .MuiButton-startIcon": {
        margin: 0,
      },
    },
    marginTop: "10px",
  },
  chipsContainer: {
    margin: "10px",
  },
  chip0: {
    color: "white",
    backgroundColor: cyan[50],
  },
  chip1: {
    color: "white",
    backgroundColor: "lightgreen",
  },
  chip2: {
    color: "white",
    backgroundColor: "#CCCC00",
  },
  chip3: {
    color: "white",
    backgroundColor: "orange",
  },
  chip4: {
    color: "white",
    backgroundColor: red[300],
  },
  chip5: {
    color: "white",
    backgroundColor: red[600],
  },
  teamButtonSection: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
    border: "1px solid grey",
    borderRadius: 4,
  },
  headerDiv: {
    textAlign: "center",
    marginBottom: 10,
  },
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
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
    deleteOpen: false,
  };

  async componentWillMount() {
    const { name } = this.props;
    try {
      const url = `${baseURL}/project/check-authorization`;
      const body = { project_name: name };
      const response = await postCall(url, body);
      const data = await response.json();
      if (data.success) {
        this.getProject();
      }
    } catch (err) {
      console.log("Project -> componentWillMount -> err", err);
    }
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
        console.log("project fetch error", err);
        this.state.showColumns = true;
      });
  };

  deleteProject = () => {
    const { project } = this.state;
    const url = `${baseURL}/project/delete`;
    const body = { id: project.id };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("delete project success", data);
        window.location.href = `${clientBaseURL}/home`;
      })
      .catch((err) => console.log("delete project error", err));
  };

  openDelete = () => {
    this.setState({ deleteOpen: true });
  };

  closeDelete = () => {
    this.setState({ deleteOpen: false });
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
    const {
      project,
      columns,
      teamMembers,
      columnModalOpen,
      deleteOpen,
    } = this.state;
    const { classes } = this.props;
    const priorityArray = [
      { label: "None", class: classes.chip0 },
      { label: "Low", class: classes.chip1 },
      { label: "Medium", class: classes.chip2 },
      { label: "High", class: classes.chip3 },
      { label: "Critical", class: classes.chip4 },
      { label: "Blocker", class: classes.chip5 },
    ];
    const isAuthorized = project.name ? true : false;

    console.log("Project -> render -> project", project);
    return (
      <div className={classes.projectMainDiv}>
        {isAuthorized ? (
          <DndProvider backend={HTML5Backend}>
            <AddColumnModal
              isOpen={columnModalOpen}
              close={this.closeColumnModal}
              projectId={project?.id}
              order={columns.length || 0}
            />
            <div>
              <ConfirmDialog
                message="This will irreversibly delete this project and all its tasks"
                open={deleteOpen}
                confirm={this.deleteProject}
                deny={this.closeDelete}
              />
              <div className={classes.headerButtons}>
                <div className={classes.teamButtonSection}>
                  <Typography variant="h6">Team Members</Typography>
                  <ProjectTeam
                    teamMembers={teamMembers}
                    teamId={project.team_id}
                    reload={(id) => this.getTeamUserArray(id)}
                  />
                </div>
                <div className={classes.smallSectionProject}>
                  <ProjectToggle />
                  <Button
                    variant="outlined"
                    startIcon={<DeleteForeverIcon />}
                    onClick={this.openDelete}
                    className={classes.deleteButton}
                  >
                    <Hidden smDown>Delete Project</Hidden>
                  </Button>
                </div>
              </div>
              <div className={classes.headerDiv}>
                <Typography variant="h4" style={{ marginBottom: 15 }}>
                  {project.name}
                </Typography>
                <Typography variant="body1">{project.description}</Typography>
              </div>
              <div className={classes.chipsContainer}>
                {priorityArray.map((p) => (
                  <Chip label={p.label} className={p.class} />
                ))}
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
                ) : null}
              </ScrollingComponent>
            </div>
          </DndProvider>
        ) : (
          <div className={classes.emptyContainer}>
            <EmptyCard />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Project);
