import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DragTarget from "./DragTarget";
import Task from "../Task";
import { baseURL } from "../../config/settings";
import Button from "@material-ui/core/Button";

class Column extends React.Component {
  state = {
    tasks: [],
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

  addTask = (columnId) => {
    console.log("adding task to ", columnId);
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
    const { tasks } = this.state;

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
        <Button onClick={() => this.addTask(column.id)}>Add task</Button>
      </Grid>
    );
  }
}

export default Column;
