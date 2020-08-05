import React, { useState, useEffect } from "react";
import { baseURL } from "../../../config/settings";
import { getCall } from "../../../apiCalls/apiCalls";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles, Select, Step } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { fade, withStyles } from "@material-ui/core/styles";
import { cyan } from "@material-ui/core/colors";

const ColouredSwitch = withStyles({
  switchBase: {
    color: cyan[300],
    "&$checked": {
      color: cyan[500],
    },
    "&$checked + $track": {
      backgroundColor: cyan[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.error.main, 0.25),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  userField: {
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  timeField: {
    width: 300,
  },
  bottomStack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toggle: {
    alignItems: "right",
  },
  editTaskButton: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    width: "45%",
  },
  deleteTaskButton: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    width: "45%",
  },
  priority: {
    width: 270,
  },
  priorityFlagStack: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  flagDiv: {
    alignItems: "right",
    justifyContent: "right",
    width: 270,
    paddingLeft: 100,
  },
  createTaskTitle: {
    width: "100%",
    marginTop: 25,
    marginBottom: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskEditDetailMainWrapper: {
    width: 600,
    height: 650,
    alignItems: "center",
    alignItems: "center",
  },
}));

function TaskEditDetail(props) {
  const classes = useStyles();
  const { currValues, team_id } = props;

  const prioritiesArray = [
    "5 - blocker",
    "4 - critical",
    "3 - high",
    "2 - medium",
    "1 - low",
    "0 - None",
  ];
  const currPriority = prioritiesArray.find(getPriority);

  const [name, setName] = useState(currValues.name);
  const [description, setDescription] = useState(currValues.description);
  const [user_id_assigned, setUserAssigned] = useState(
    currValues.user_id_assigned
  );
  const [priority, setPriority] = useState(currPriority);
  const [time_estimated, setTimeEstimated] = useState(
    currValues.time_estimated
  );
  const [time_elapsed, setTimeCompleted] = useState(currValues.time_elapsed);
  const [flag, setFlag] = useState(currValues.flag);
  const [teamUserArray, setteamUserArray] = useState([]);
  const [userCreated, setUserCreated] = useState([]);

  function getPriority(p) {
    return p.charAt(0) == currValues.priority;
  }

  useEffect(() => {
    async function getTeamUserArray() {
      console.log("getting team users for: ", team_id);
      const url = `${baseURL}/team/${props.team_id}/users`;
      const response = await getCall(url);

      const payload = await response.json();
      const { data: teamMembers } = payload;
      console.log(teamMembers);
      if (response.status === 200) {
        setteamUserArray(teamMembers);
      }
    }
    async function getUserCreatedInfo() {
      const url = `${baseURL}/user/info/${currValues.user_id_created}`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload.data[0]);
          setUserCreated(payload.data[0]);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getUserCreatedInfo();
    getTeamUserArray(team_id);
  }, [team_id, currValues.user_id_created]);

  const editTask = () => {
    const priorityInt =
      priority == "" || priority == null ? null : priority.charAt(0);
    const timeEstimated = parseFloat(time_estimated);
    console.log("user_id_assigned before parse: ", user_id_assigned);

    const userIdAssigned = user_id_assigned == "" ? null : user_id_assigned;

    const updatedValues = {
      id: currValues.id,
      name,
      description,
      user_id_assigned: userIdAssigned,
      priority: priorityInt,
      time_estimated: timeEstimated,
      time_elapsed,
      flag,
    };
    console.log("TaskEditDetail - editTask updatedValues: ", updatedValues);
    props.editTask(updatedValues);
  };

  const deleteTask = () => {
    console.log(
      "TaskEditDetail - entered deleteTask with taskId: ",
      currValues.id
    );
    props.deleteTask();
  };

  const assignUser = (event) => {
    console.log("event value is: ", event.target.value);
    setUserAssigned(event.target.value);
  };

  const assignFlag = (event) => {
    console.log("event value is: ", event.target.checked);
    setFlag(event.target.checked);
  };

  const assignPriority = (event) => {
    console.log("event value is: ", event.target.value);
    setPriority(event.target.value);
  };

  const assignTimeEstimated = (event) => {
    console.log("event value is: ", event.target.value);
    const re = /^(\d+(\.\d+)?)+$/;

    if (event.target.value === "") {
      setTimeEstimated(null);
    } else if (re.test(event.target.value)) {
      setTimeEstimated(event.target.value);
    }
  };

  const assignTimeCompleted = (event) => {
    console.log("event value is: ", event.target.value);
    const re = /^(\d+(\.\d+)?)+$/;

    if (event.target.value === "") {
      setTimeCompleted(null);
    } else if (re.test(event.target.value)) {
      setTimeCompleted(event.target.value);
    }
  };

  return (
    <Card className={classes.taskEditDetailMainWrapper}>
      <Typography className={classes.createTaskTitle} variant="h4">
        Edit Task. 🥅
      </Typography>
      <div className="col-input-wrapper">
        <TextField
          className={classes.formControl}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          defaultValue={currValues.name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.description}
          id="outlined-basic"
          label="Task description"
          multiline
          rows={4}
          variant="outlined"
          defaultValue={currValues.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={classes.bottomStack}>
          <TextField
            labelId="createdUserLabel"
            value={`${userCreated.username} - ${userCreated.first_name} ${userCreated.last_name}`}
            label="Created By"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            className={classes.userField}
          />

          <FormControl variant="outlined" className={classes.userField}>
            <InputLabel id="assignUserLabel">Assigned User</InputLabel>
            <Select
              labelId="assignUserLabel"
              defaultValue={currValues.user_id_assigned}
              onChange={assignUser}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {teamUserArray.map((user) => (
                <MenuItem value={user.id}>
                  {user.username} - {user.first_name} {user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={classes.bottomStack}>
          <TextField
            className={classes.timeField}
            id="outlined-number"
            label="Time Estimated (hr)"
            type="number"
            defaultValue={currValues.time_estimated}
            variant="outlined"
            onChange={assignTimeEstimated}
            inputProps={{ step: 0.5 }}
          />

          <TextField
            className={classes.timeField}
            id="outlined-number"
            label="Time Completed (hr)"
            defaultValue={currValues.time_elapsed}
            type="number"
            variant="outlined"
            onChange={assignTimeCompleted}
            inputProps={{ step: 0.5 }}
          />
        </div>

        <div className={classes.priorityFlagStack}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="assignPriorityLabel">Priority</InputLabel>
            <Select
              labelId="assignPriorityLabel"
              defaultValue={currPriority}
              onChange={assignPriority}
              className={classes.priority}
            >
              {prioritiesArray.map((priority) => (
                <MenuItem value={priority}>{priority}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={classes.flagDiv}>
            <FormControl className={classes.toggle} component="fieldset">
              <FormControlLabel
                control={
                  <ColouredSwitch
                    checked={flag}
                    onChange={assignFlag}
                    name="flag"
                  />
                }
                label="Flagged"
                defaultValue={currValues.flag}
              />
            </FormControl>
          </div>
        </div>

        <div className={classes.bottomStack}>
          <Button
            variant="outlined"
            classes={{ root: classes.root }}
            className={classes.deleteTaskButton}
            onClick={deleteTask}
          >
            Delete Task
          </Button>
          <Button
            variant="outlined"
            className={classes.editTaskButton}
            onClick={editTask}
          >
            Edit Task
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TaskEditDetail;
