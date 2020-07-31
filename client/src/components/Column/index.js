import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DragTarget from "./DragTarget";
import TaskCard from "../Tasks/TaskCard";
import TaskDetail from "../Tasks/TaskDetail";
import { baseURL } from "../../config/settings";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall, deleteCall } from "../../apiCalls/apiCalls";

import "./index.scss";

const styles = (theme) => ({
  columnPaper: {
    padding: "5px",
    height: "100%",
    backgroundColor: "inherit",
  },
});

class Column extends React.Component {
  state = {
    tasks: [],
    anchorEl: null,
    currTaskName: "",
    currDescription: "",
  };

  componentDidMount() {
    this.getTasks();
  }

  handleClick = (event) => {
    console.log("Column -> handleClick -> event", event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidUpdate(prevProps, prevState) {
    const { column } = this.props;
    if (prevProps.column.tasks != column.tasks) {
      console.log("reloading");
      this.getTasks();
    }
  }

  getTasks = () => {
    const { column } = this.props;
    console.log("column", column.name, column.tasks.length);
    const url = `${baseURL}/project/tasks`;
    const body = { task_ids: column.tasks };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch tasks success", data);
        this.setState({ tasks: data.data });
      })
      .catch((err) => console.log("task fetch error", err));
  };

  addTask = (details) => {
    console.log("entered addTask function")
    const { name, description, userIdCreated, userIdAssigned, priority, timeEstimated, flag } = details;
    console.log("name", name, "description", description)
    const { projectId, column } = this.props;
    console.log("projectId", projectId, "column", column)
    const url = `${baseURL}/project/task`;
    const body = {
      name: name,
      description: description,
      column_id: column.id,
      project_id: projectId,
    };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch tasks success", data);
        this.handleClose();
        window.location.reload(false);
      });
  };

  onDrop = (task) => {
    const { column, projectId, reload } = this.props;
    const url = `${baseURL}/project/task`;
    const body = {
      name: task.name,
      description: task.description,
      project_id: projectId,
      column_id: column.id,
    };
    postCall(url, body)
      .then(() => {
        const delUrl = `${baseURL}/project/task/${task.id}/delete`;
        return deleteCall(delUrl);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("create tasks success", data);
        reload();
      })
      .catch((err) => console.log("create fetch error", err));
  };

  render() {
    const { column, classes } = this.props;
    const { tasks, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log("Column -> render -> open", open);
    const id = open ? "simple-popover" : undefined;
    return (
      <Grid item key={column.id} className={classes.column}>
        <DragTarget columnName={column.name} onDrop={this.onDrop}>
          <Paper className={classes.columnPaper}>
            <Typography>{column.name}</Typography>
            {tasks?.map((t) => (
              <TaskCard task={t} key={t.id} columnId={column.id} />
            ))}
          </Paper>
        </DragTarget>
        <Button onClick={this.handleClick}>Add task</Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          
          <TaskDetail addTask={this.addTask.bind(this)}/>
        </Popover>
      </Grid>
    );
  }
}

export default withStyles(styles)(Column);
