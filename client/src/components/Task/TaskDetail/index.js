import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import "./index.scss";
import { makeStyles, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { cyan, grey } from '@material-ui/core/colors';



const ColouredSwitch = withStyles({
    switchBase: {
      color: cyan[300],
      '&$checked': {
        color: cyan[500],
      },
      '&$checked + $track': {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createTaskButton: {
        marginTop: 25,
        width: "50%",
    },
    flagDiv: {
        alignItems: 'right',
        justifyContent: 'right',
        width: 300,
        paddingLeft: 100,
    },
    toggle: {
        alignItems: 'right',
    },
    createTaskTitle: {
        width: "100%",
        marginTop: 25,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskDetailMainWrapper: {
        width: 600,
        height: 650,
        alignItems: 'center',
        alignItems: 'center',
    }
  }));

function TaskDetail(props) {
    const classes = useStyles();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [userIdAssigned, setUserAssigned] = useState(null);
    const [priority, setPriority] = useState("");
    const [timeEstimated, setTimeEstimated] = useState(null);
    const [flag, setFlag] = useState(false);

    const tempUserArray = ["person1", "person2", "person3"]
    const prioritiesArray = ["5 - blocker", "4 - critical", "3 - high", "2 - medium", "1 - low", "0 - None"]


    const createTask = () => {
        // TODO: handle properly tagging users
        const assignedUserId = 4
        const assignedPriority = priority == "" ? null : priority.charAt(0)
        const details = {name, description, userIdAssigned: assignedUserId, assignedPriority, timeEstimated, flag}
        console.log("task details: ", details)
        props.addTask(details);
    }

    const assignUser = (event) => {
        console.log("event value is: ", event.target.value)
        setUserAssigned(event.target.value)
    }

    const assignFlag = (event) => {
        console.log("event value is: ", event.target.checked)
        setFlag(event.target.checked)
    }

    const assignPriority = (event) => {
        console.log("event value is: ", event.target.value)
        setPriority(event.target.value)
    }

    const assignTimeEstimated = (event) => {
        console.log("event value is: ", event.target.value)
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setTimeEstimated(event.target.value)
        }
    }

  return (
    <Card className={classes.taskDetailMainWrapper}>
        <Typography className={classes.createTaskTitle} variant="h4">Create a Task. 🥅</Typography>
        <div className="col-input-wrapper">
            <TextField
                className={classes.formControl}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(e) =>
                    setName(e.target.value)
                }
            />
            <TextField
                className={classes.formControl}
                id="outlined-basic"
                label="Task description"
                multiline
                rows={3}
                variant="outlined"
                onChange={(e) =>
                    setDescription(e.target.value )
                }
            />
            
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="assignUserLabel">Assign User</InputLabel>
                <Select 
                    labelId="assignUserLabel"
                    value={userIdAssigned}
                    onChange={assignUser}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {tempUserArray.map((user) => (
                        <MenuItem value={user}>{user}</MenuItem>
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
                        <MenuItem value={priority}>{priority}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className={classes.bottomStack}>
                <TextField
                    className={classes.timeEstimated}
                    id="outlined-number"
                    label="Time Estimated"
                    type="number"
                    variant="outlined"
                    onChange={assignTimeEstimated}
                />

                <div className={classes.flagDiv}>
                    <FormControl className={classes.toggle} component="fieldset">
                            <FormControlLabel
                                control={
                                    <ColouredSwitch checked={flag} onChange={assignFlag} name="flag" />}
                                label="Flagged"
                            />
                    </FormControl>
                </div>
            </div>

            <div className={classes.bottomStack}>
                <Button variant="outlined" className={classes.createTaskButton} onClick={createTask}>Create Task</Button>
            </div>
        </div>
    </Card>
  );
};

export default TaskDetail;
