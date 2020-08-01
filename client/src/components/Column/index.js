import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DragTarget from "./DragTarget";
import TaskCard from "../Task/TaskCard";
import { baseURL } from "../../config/settings";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { postCall, getCall, deleteCall } from "../../apiCalls/apiCalls";

import "./index.scss";
import TaskDetail from "../Task/TaskDetail";

const styles = (theme) => ({
  columnPaper: {
    padding: "5px",
    height: "100%",
    backgroundColor: "rgba(200,200,200,0.25)",
    width: props => props.width,
  },
  popover: {
    padding: "5px",
    height: "100%",
  },
  taskDetail: {
    padding: "5px",
    height: "100%",
  },
  column: {
    minWidth: '300px',
    marginBottom: '50px'
  }
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
    console.log("sending addTask to server")
    const {name, description, userIdAssigned, priority, timeEstimated, flag} = details;
    const { projectId, column } = this.props;
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
          <Paper elevation={4} className={classes.columnPaper}>
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
          className={classes.popover}
        >
          <TaskDetail addTask={this.addTask.bind(this)} className={classes.taskDetail}/>
        </Popover>
      </Grid>
    );
  }
}

export default withStyles(styles)(Column);
