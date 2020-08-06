import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DragTarget from "./DragTarget";
import Task from "../Task/TaskCard";
import { baseURL } from "../../config/settings";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { postCall, getCall, deleteCall } from "../../apiCalls/apiCalls";
import ColumnMenu from './menu';

import "./index.scss";
import TaskDetail from "../Task/TaskDetail";

const styles = (theme) => ({
  columnPaper: {
    padding: "5px",
    height: "100%",
    minHeight: 500,
    backgroundColor: "rgba(200,200,200,0.25)",
    width: (props) => props.width,
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
    marginBottom: "50px",
    minHeight: 400,
  },
  addTaskButton: {
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonDiv: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  mainColumnDiv: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  columnName: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  columnHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const ConfirmDialog = ({message, open, confirm, deny}) => {
  return (
    <Dialog
      open={open}
      onClose={deny}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deny} color="primary">
          Cancel
        </Button>
        <Button onClick={confirm} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
        this.setState({ tasks: data.data });
      })
      .catch((err) => console.log("task fetch error", err));
  };

  addTask = (details) => {
    console.log("sending addTask to server with details: ", details);
    const {
      name,
      description,
      userIdAssigned,
      assignedPriority,
      time_estimated,
      flag,
    } = details;
    const { projectId, column } = this.props;
    const url = `${baseURL}/project/create/task`;
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
    const { column, projectId, reload } = this.props;
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
  }

  openDelete = () => {
    this.setState({ deleteOpen: true });
  }

  deleteColumn = () => {
    const { column, reload } = this.props;
    const url = `${baseURL}/project/column/${column.id}`;
    deleteCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("delete column success", data);
        reload();
      })
      .catch((err) => console.log("delete column error", err));
  };

  setFilters = (newFilter, filterId) => {
    const { filters } = this.state;
    filters[filterId] = newFilter.length ? newFilter : undefined;
    this.setState({ filters });
  }

  filterTasks = () => {

  }

  setSortBy = ({sortBy}) => {
    const { sort } = this.state;
    this.setState({sort: sortBy, sortAsc: true});
  }

  switchSortDirection = () => {
    const { sortAsc } = this.state;
    this.setState({ sortAsc: !sortAsc});
  }

  compareFunc = (a, b) => {
    const { sort, sortAsc } = this.state;
    if(a[sort] > b[sort]) return sortAsc ? 1 : -1;
    if(a[sort] < b[sort]) return sortAsc ? -1 : 1;

    return 0;
  }

  render() {
    const { column, classes } = this.props;
    const { tasks, anchorTask, anchorMenu, sort, sortAsc, filters, deleteOpen } = this.state;
    const taskOpen = Boolean(anchorTask);
    console.log("Column -> render -> open", taskOpen);
    const id = taskOpen ? "simple-popover" : undefined;

    const tempTeamMembers = [{ name: 'person 1', id: 1},  {name: 'person 2', id: 2}, {name: 'person 3', id: 3}]; //Should be passed in or called from api
    const tempPriorities = [{name: '0', id: 0}, { name: '1', id: 1},  {name: '2', id: 2}, {name: '3', id: 3}, {name: '4', id: 4}, {name: '5', id: 5}] //should be read from constants file?

    const filterOptions = [
      {name: 'Assigned User', id: 'user_id_assigned', options: tempTeamMembers},
      {name: 'Priority', id: 'priority', options: tempPriorities}
    ];

    if(!!sort) tasks.sort(this.compareFunc);

    let filteredTasks = tasks;
    if(!!Object.keys(filters).length) filteredTasks = tasks.filter((t) => {
      for(let f of Object.keys(filters)) {
        if(filters[f]?.indexOf(t[f]) < 0) return false;
      }
      return true;
    })

    return (
      <div className={classes.mainColumnDiv}>
        <div className={classes.buttonDiv}>
          <Button
            variant="outlined"
            className={classes.addTaskButton}
            onClick={this.openTaskPopover}
          >
            Add task
          </Button>
        </div>
        <Grid item key={column.id} className={classes.column}>
          <ConfirmDialog message='This will delete this column and all its tasks' open={deleteOpen} confirm={this.deleteColumn} deny={this.closeDelete}/>
          <DragTarget columnName={column.name} onDrop={this.onDrop}>
            <Paper elevation={4} className={classes.columnPaper}>
              <div className={classes.columnHeader}>
                <Typography>{column.name}</Typography>
                <span>
                  {!!sort && <IconButton onClick={this.switchSortDirection}>{sortAsc ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}</IconButton>}
                  <IconButton onClick={this.openMenu}><MoreVertIcon/></IconButton>
                </span>
                <ColumnMenu
                  anchorEl={anchorMenu}
                  handleClose={this.closeMenu}
                  setSort={this.setSortBy}
                  filters={filters}
                  filterOptions={filterOptions}
                  setFilters={this.setFilters}
                  deleteFunction={this.openDelete}
                />
              </div>
              {filteredTasks?.map((t) => (
                  <Task
                    task={t}
                    key={t.id}
                    columnId={column.id}
                    deleteTask={this.deleteTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    team_id={this.props.teamId}
                  />
                ))}
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
              team_id={this.props.teamId}
            />
          </Popover>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Column);
