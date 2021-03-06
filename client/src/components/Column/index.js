import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DragTarget from "./DragTarget";
import Task from "../Task/TaskCard";
import { baseURL } from "../../config/settings";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import ColumnMenu from "./menu";
import { priorities } from "../constants";
import { postCall, deleteCall } from "../../apiCalls/apiCalls";
import { red, cyan, grey } from "@material-ui/core/colors";
import "./index.scss";
import TaskDetail from "../Task/TaskDetail";
import ConfirmDialog from "../ConfirmDialog";

const styles = (theme) => ({
  columnPaper: {
    backgroundColor: "rgba(230,220,220,0.25)",
    width: (props) => props.width,
    minWidth: "300px",
    padding: "5px",
    height: "100%",
  },
  taskContainer: {
    overflowY: "scroll",
    height: "80%",
    paddingBottom: "15px",
    paddingRight: "10px",
  },
  popover: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  taskDetail: {
    padding: "5px",
    height: "100%",
  },
  column: {
    minWidth: "300px",
    height: "100%",
  },
  mainColumnDiv: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  columnHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 3,
    height: "7%",
  },
  columnName: {
    overflowX: "scroll",
    marginLeft: "4px",
  },
  addTaskButton: {
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonDiv: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingTop: 1,
    height: "7%",
  },
});

class Column extends React.Component {
  state = {
    tasks: [],
    anchorTask: null,
    anchorMenu: null,
    deleteOpen: false,
    currTaskName: "",
    currDescription: "",
    sort: "",
    sortAsc: true,
    filters: {},
  };

  componentDidMount() {
    this.getTasks();
  }

  openTaskPopover = (event) => {
    console.log("Column -> openTaskPopover -> event", event.currentTarget);
    this.setState({ anchorTask: event.currentTarget });
  };

  closeTaskPopover = () => {
    this.setState({ anchorTask: null });
  };

  openMenu = (event) => {
    console.log("Column -> openMenu -> event", event.currentTarget);
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
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
        const tasks = data.data.map((t) => ({
          ...t,
          date_created: new Date(t.date_created),
        }));
        this.setState({ tasks: tasks });
      })
      .catch((err) => console.log("task fetch error", err));
  };

  addTask = (details) => {
    console.log("sending addTask to server with details: ", details);
    const {
      name,
      description,
      userIdAssigned,
      priority,
      time_estimated,
      flag,
    } = details;
    const { projectId, column } = this.props;
    const url = `${baseURL}/project/create/task`;
    const body = {
      name: name,
      description: description,
      user_id_assigned: userIdAssigned,
      priority,
      time_estimated: time_estimated,
      flag: flag,
      column_id: column.id,
      project_id: projectId,
    };
    console.log("sending addTask to server with body: ", body);
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Add Task Response", data);
        this.closeTaskPopover();
        window.location.reload(false);
      })
      .catch((err) => console.log("Add Task Error", err));
  };

  editTask = (task) => {
    const { reload } = this.props;
    console.log("Column - entered editTask with: ", task);
    const url = `${baseURL}/project/task/${task.id}/edit`;
    const body = {
      id: task.id,
      name: task.name,
      description: task.description,
      flag: task.flag,
      user_id_assigned: task.user_id_assigned,
      time_estimated: task.time_estimated,
      time_elapsed: task.time_elapsed,
      priority: task.priority,
    };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Edit Task Response", data);
        this.closeTaskPopover();
        reload();
      })
      .catch((err) => console.log("Edit Task error", err));
  };

  onDrop = (task) => {
    const { column, reload } = this.props;
    console.log("moved task ", task, "to column: ", column);
    const url = `${baseURL}/project/task/${task.id}/move`;
    const body = {
      column_id: column.id,
    };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Move Task Response", data);
        reload();
      })
      .catch((err) => console.log("Move Task error", err));
  };

  deleteTask = (taskId) => {
    console.log("Column - entered deleteTask with taskId: ", taskId);
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

  closeDelete = () => {
    this.setState({ deleteOpen: false });
  };

  openDelete = () => {
    this.setState({ deleteOpen: true });
  };

  deleteColumn = () => {
    const { column, reload } = this.props;
    const url = `${baseURL}/project/column/delete`;
    postCall(url, { id: column.id })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete column success", data);
        reload();
      })
      .catch((err) => console.log("delete column error", err));
  };

  setFilters = (newFilter, filterId) => {
    const { filters } = this.state;
    if (newFilter.length) filters[filterId] = newFilter;
    else delete filters[filterId];
    this.setState({ filters });
  };

  setSortBy = ({ sortBy }) => {
    this.setState({ sort: sortBy, sortAsc: true });
  };

  switchSortDirection = () => {
    const { sortAsc } = this.state;
    this.setState({ sortAsc: !sortAsc });
  };

  compareFunc = (a, b) => {
    const { sort, sortAsc } = this.state;
    if (a[sort] > b[sort]) return sortAsc ? 1 : -1;
    if (a[sort] < b[sort]) return sortAsc ? -1 : 1;

    return 0;
  };

  setPriorityTaskColor = (priority) => {
    console.log("entered setPriorityTaskColor with priority: ", priority);
    switch (priority) {
      case 5:
        return red[600];
      case 4:
        return red[300];
      case 3:
        return "orange";
      case 2:
        return "yellow";
      case 1:
        return "lightgreen";
      default:
        return cyan[50];
    }
  };

  setNewBackgroundColor = (flag, isOverdue) => {
    if (flag) {
      return grey[200];
    } else if (isOverdue) {
      return red[100];
    } else {
      return "white";
    }
  };

  render() {
    const { column, classes, team } = this.props;
    const {
      tasks,
      anchorTask,
      anchorMenu,
      sort,
      sortAsc,
      filters,
      deleteOpen,
    } = this.state;
    const taskOpen = Boolean(anchorTask);
    const id = taskOpen ? "simple-popover" : undefined;

    const teamMembers = team.map((u) => ({ id: u.id, name: u.username }));

    const filterOptions = [
      {
        name: "Assigned User",
        id: "user_id_assigned",
        displayName: true,
        options: teamMembers,
      },
      { name: "Priority", id: "priority", options: priorities },
    ];

    let filteredTasks = tasks.slice();
    if (!!sort) filteredTasks.sort(this.compareFunc);

    if (!!Object.keys(filters).length)
      filteredTasks = filteredTasks.filter((t) => {
        for (let f of Object.keys(filters)) {
          if (filters[f]?.indexOf(t[f]) < 0) return false;
        }
        return true;
      });

    return (
      <div className={classes.mainColumnDiv}>
        <Grid item key={column.id} className={classes.column}>
          <ConfirmDialog
            message="This will delete this column and all its tasks"
            open={deleteOpen}
            confirm={this.deleteColumn}
            deny={this.closeDelete}
          />

          <DragTarget onDrop={this.onDrop}>
            <Paper elevation={4} className={classes.columnPaper}>
              <div className={classes.buttonDiv}>
                <Button
                  variant="outlined"
                  onClick={this.openTaskPopover}
                  color="secondary"
                  className={classes.addTaskButton}
                >
                  Add task
                </Button>
              </div>
              <Paper className={classes.columnHeader}>
                <Typography className={classes.columnName} color="secondary">
                  {column.name}
                </Typography>
                <span>
                  {!!sort && (
                    <IconButton onClick={this.switchSortDirection}>
                      {sortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  )}
                  <IconButton onClick={this.openMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </span>
                <ColumnMenu
                  anchorEl={anchorMenu}
                  handleClose={this.closeMenu}
                  sort={sort}
                  setSort={this.setSortBy}
                  filters={filters}
                  filterOptions={filterOptions}
                  setFilters={this.setFilters}
                  deleteFunction={this.openDelete}
                />
              </Paper>
              <div className={classes.taskContainer}>
                {filteredTasks?.map((t) => (
                  <Task
                    task={t}
                    key={t.id}
                    columnId={column.id}
                    deleteTask={this.deleteTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    team={team}
                    priorityColor={this.setPriorityTaskColor(t.priority)}
                    backgroundColor={this.setNewBackgroundColor(
                      t.flag,
                      t.time_elapsed > t.time_estimated
                    )}
                  />
                ))}
              </div>
            </Paper>
          </DragTarget>

          <Popover
            id={id}
            open={taskOpen}
            anchorEl={anchorTask}
            onClose={this.closeTaskPopover}
            anchorReference={"none"}
            classes={{
              root: classes.popover,
            }}
          >
            <TaskDetail
              addTask={this.addTask.bind(this)}
              className={classes.taskDetail}
              team={team}
            />
          </Popover>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Column);
