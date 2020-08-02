import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Column from "../Column";
import AddColumnModal from "../Column/addModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { baseURL } from "../../config/settings";
import { getCall } from "../../apiCalls/apiCalls";
import ProjectToggle from "./projectToggle";
class Project extends React.Component {
  state = {
    project: {},
    columns: [],
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

  closeColumnModal = () => {
    const { project } = this.state;
    this.setState({ columnModalOpen: false });
    this.getColumns(project.id);
  };

  openColumnModal = () => {
    this.setState({ columnModalOpen: true });
  };

  render() {
    const { project, columns, columnModalOpen } = this.state;
    console.log("Project -> render -> project", project);
    return (
      <div>
        <DndProvider backend={HTML5Backend}>
          <AddColumnModal
            isOpen={columnModalOpen}
            close={this.closeColumnModal}
            projectId={project?.id}
            order={columns.length || 0}
          />
          <Typography variant="h6" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {project.description}
          </Typography>
          <Button startIcon={<AddIcon />} onClick={this.openColumnModal}>
            Add Column
          </Button>
          <ProjectToggle />
          <Grid container spacing={2}>
            {columns.map((c) => (
              <Column
                column={c}
                key={c.id}
                projectId={project?.id}
                reload={this.getProject}
              />
            ))}
          </Grid>
        </DndProvider>
      </div>
    );
  }
}

export default Project;
