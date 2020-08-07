import React, { useState, useEffect } from "react";
import { baseURL } from "../../../config/settings";
import { getCall } from "../../../apiCalls/apiCalls";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { cyan, grey } from "@material-ui/core/colors";
import { priorities } from '../../constants';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  timeEstimated: {
    width: 300,
  },
  bottomStack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  createTaskButton: {
    marginTop: 25,
    width: "50%",
  },
  flagDiv: {
    alignItems: "right",
    justifyContent: "right",
    width: 300,
    paddingLeft: 100,
  },
  toggle: {
    alignItems: "right",
  },
  createTaskTitle: {
    width: "100%",
    marginTop: 25,
    marginBottom: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskDetailMainWrapper: {
    width: 600,
    height: 650,
    alignItems: "center",
  },
}));

function TaskDetail(props) {
  const classes = useStyles();

  const { team } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userIdAssigned, setUserAssigned] = useState(null);
  const [priority, setPriority] = useState("");
  const [timeEstimated, setTimeEstimated] = useState(null);
  const [flag, setFlag] = useState(false);
  const [teamUserArray, setteamUserArray] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const prioritiesArray = [
    "5 - blocker",
    "4 - critical",
    "3 - high",
    "2 - medium",
    "1 - low",
    "0 - None",
  ];

  useEffect(() => {
    async function getTeamUserArray() {
      console.log("getting team users for: ", team_id);
      const url = `${baseURL}/team/${team_id}/users`;
      const response = await getCall(url);

      const payload = await response.json();
      const { data: teamMembers } = payload;
      console.log(teamMembers);
      if (response.status === 200) {
        setteamUserArray(teamMembers);
      }
    }
    getTeamUserArray(team_id);
  }, [team_id]);

  const createTask = () => {
    const assignedPriority = priority === "" ? null : priority.charAt(0);
    const details = {
      name,
      description,
      userIdAssigned,
      priority: priority || null,
      time_estimated: timeEstimated,
      flag,
    };
    console.log("task details: ", details);
    props.addTask(details);
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

  const assignTitle = (event) => {
    console.log("event value is: ", event.target.value);
    setName(event.target.value);
    if (event.target.value != "") {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
    
  };

  return (
    <Card className={classes.taskDetailMainWrapper}>
      <Typography className={classes.createTaskTitle} variant="h4">
        Create a Task. 🥅
      </Typography>
      <div className="col-input-wrapper">
        <TextField
          required
          className={classes.formControl}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={assignTitle}
        />
        <TextField
          className={classes.formControl}
          id="outlined-basic"
          label="Task description"
          multiline
          rows={3}
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="assignUserLabel">Assign User</InputLabel>
          <Select
            labelId="assignUserLabel"
            value={userIdAssigned ?? 0}
            onChange={assignUser}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {team.map((user) => (
              <MenuItem value={user.id}>
                {user.username} - {user.first_name} {user.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="assignPriorityLabel">Priority</InputLabel>
          <Select
            labelId="assignPriorityLabel"
            value={priority}
            onChange={assignPriority}
          >
            {prioritiesArray.map((priority) => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={classes.bottomStack}>
          <TextField
            className={classes.timeEstimated}
            id="outlined-number"
            label="Time Estimated (hr)"
            type="number"
            variant="outlined"
            onChange={assignTimeEstimated}
            inputProps={{ step: 0.5 }}
          />

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
              />
            </FormControl>
          </div>
        </div>

        <div className={classes.bottomStack}>
          <Button
            disabled={btnDisabled}
            variant="outlined"
            className={classes.createTaskButton}
            onClick={createTask}
          >
            Create Task
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TaskDetail;
