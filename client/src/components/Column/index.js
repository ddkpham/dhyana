import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DragTarget from "./DragTarget";
import Task from "../Task";
import { baseURL } from "../../config/settings";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import "./index.scss";

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

  componentDidUpdate(prevProps, prevState) {
    const { column } = this.props;
    if (prevProps.column.tasks != column.tasks) {
      console.log("reloading");
      this.getTasks();
    }
  }

  handleClick = (event) => {
    console.log("Column -> handleClick -> event", event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  getTasks = () => {
    const { column } = this.props;
    console.log("column", column.name, column.tasks.length);
    const url = `${baseURL}/project/tasks`;
    const body = { task_ids: column.tasks };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch tasks success", data);
        this.setState({ tasks: data.data });
      })
      .catch((err) => console.log("task fetch error", err));
  };

  addTask = () => {
    const { currDescription, currTaskName } = this.state;
    const { projectId, column } = this.props;
    const url = `${baseURL}/project/task`;
    const body = {
      name: currTaskName,
      description: currDescription,
      column_id: column.id,
      project_id: projectId,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
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
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        const delUrl = `${baseURL}/project/task/${task.id}/delete`;
        return fetch(delUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("create tasks success", data);
        reload();
      })
      .catch((err) => console.log("create fetch error", err));
  };

  render() {
    const { column } = this.props;
    const { tasks, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log("Column -> render -> open", open);
    const id = open ? "simple-popover" : undefined;
    return (
      <Grid item key={column.id}>
        <DragTarget columnName={column.name} onDrop={this.onDrop}>
          <Paper>
            <Typography>{column.name}</Typography>
            {tasks?.map((t) => (
              <Task task={t} key={t.id} columnId={column.id} />
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
          <Card className="col-task-wrapper">
            <div className="col-title-wrapper">
              <Typography className="title">Create a Task. 🥅</Typography>
            </div>
            <div className="col-input-wrapper">
              <TextField
                className="col-text-field"
                id="outlined-basic"
                label="Task name"
                variant="outlined"
                onChange={(e) =>
                  this.setState({ currTaskName: e.target.value })
                }
              />
              <TextField
                className="col-text-field"
                id="outlined-basic"
                label="Task description"
                variant="outlined"
                onChange={(e) =>
                  this.setState({ currDescription: e.target.value })
                }
              />
              <Button onClick={this.addTask}>Create task</Button>
            </div>
          </Card>
        </Popover>
      </Grid>
    );
  }
}

export default Column;
