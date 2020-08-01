import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DragTarget from "./DragTarget";
import Task from "../Task/TaskCard";
import { baseURL } from "../../config/settings";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { postCall, deleteCall } from "../../apiCalls/apiCalls";

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
  addTaskButton: {
    marginTop: 25,
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
    if (prevProps.column.tasks !== column.tasks) {
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
        console.log("Fetch Tasks Response", data);
        this.setState({ tasks: data.data });
      })
      .catch((err) => console.log("task fetch error", err));
  };

  addTask = (details) => {
    console.log("sending addTask to server with details: ", details)
    const {name, description, userIdAssigned, assignedPriority, time_estimated, flag} = details;
    const { projectId, column } = this.props;
    const url = `${baseURL}/project/task`;
    const body = {
      name: name,
      description: description,
      user_id_assigned: userIdAssigned,
      priority: assignedPriority,
      time_estimated: time_estimated,
      flag: flag,
      column_id: column.id,
      project_id: projectId,
    };
    console.log("sending addTask to server with body: ", body)
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Add Task Response", data);
        this.handleClose();
        window.location.reload(false);
      })
      .catch((err) => console.log("Add Task Error", err));
  };

  editTask = (task) => {
    const { column, projectId, reload } = this.props;
    console.log("Column - entered editTask with: ", task)
    const url = `${baseURL}/project/task/${task.id}/edit`;
    const body = {
      id: task.id,
      name: task.name,
      description: task.description,
      flag: task.flag,
      user_id_assigned: task.user_id_assigned,
      time_estimated: task.time_estimated,
      time_elapsed: task.time_elapsed,
      priority: task.priority
    };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Edit Task Response", data);
        this.handleClose();
        reload();
      })
      .catch((err) => console.log("Edit Task error", err));
};

  onDrop = (task) => {
    const { column, reload } = this.props;
    console.log("moved task ", task, "to column: ", column)
    const url = `${baseURL}/project/task/${task.id}/move`;
    const body = {
      column_id: column.id
    }
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Move Task Response", data);
        reload();
      })
      .catch((err) => console.log("Move Task error", err));
  };

  deleteTask = (taskId) => {
    console.log("Column - entered deleteTask with taskId: ", taskId)
    const { reload } = this.props;
    const delUrl = `${baseURL}/project/task/${taskId}/delete`;
    deleteCall(delUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete Task Response", data);
        reload();
      })
      .catch((err) => console.log("Delete Task error", err));
  };

  render() {
    const { column, classes } = this.props;
    const { tasks, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <Grid item key={column.id} className={classes.column}>
        <DragTarget columnName={column.name} onDrop={this.onDrop}>
          <Paper elevation={4} className={classes.columnPaper}>
            <Typography>{column.name}</Typography>
            {tasks?.map((t) => (
              <Task task={t} key={t.id} columnId={column.id} 
                  deleteTask={this.deleteTask.bind(this)} 
                  editTask={this.editTask.bind(this)}
                  />
            ))}
          </Paper>
        </DragTarget>
        <Button className={classes.addTaskButton} onClick={this.handleClick}>Add task</Button>
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
