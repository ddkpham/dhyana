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
import { fade, withStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';


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
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    timeEstimated: {
        width: 220,
    },
    bottomStack: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggle: {
        alignItems: 'right',
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
        width: 220,
    },
    priorityFlagStack: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    flagDiv: {
        alignItems: 'right',
        justifyContent: 'right',
        width: 220,
        paddingLeft: 50,
    }
  }));

function TaskEditDetail(props) {
    const classes = useStyles();
    const { currValues } = props;
    console.log(currValues)

    const tempUserArray = ["person1", "person2", "person3"]
    const prioritiesArray = ["5 - blocker", "4 - critical", "3 - high", "2 - medium", "1 - low", "0 - None"]
    const currPriority = prioritiesArray.find(getPriority)

    const [name, setName] = useState(currValues.name);
    const [description, setDescription] = useState(currValues.description);
    const [userIdAssigned, setUserAssigned] = useState(currValues.userIdAssigned);
    const [priority, setPriority] = useState(currPriority);
    const [timeEstimated, setTimeEstimated] = useState(currValues.time_estimated);
    const [timeCompleted, setTimeCompleted] = useState(currValues.time_elapsed);
    const [flag, setFlag] = useState(currValues.flag);

    // useEffect(() => {
    // }

    function getPriority(p) {
        return p.charAt(0) == currValues.priority
    }

    const editTask = () => {
        // const priorityInt = priority.charAt(0)
        // // TODO: handle properly tagging users
        // const assignedUserId = 4
        // const details = {name, description, userIdAssigned: assignedUserId, priorityInt, timeEstimated, flag}
        // console.log("task details: ", details)
        // props.addTask(details);
    }

    const deleteTask = () => {

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

    const assignTimeCompleted = (event) => {
        console.log("event value is: ", event.target.value)
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setTimeCompleted(event.target.value)
        }
    }

  return (
    <Card className="col-task-wrapper">
        <div className="col-title-wrapper">
            <Typography className="title">Edit Task. 🥅</Typography>
        </div>
        <div className="col-input-wrapper">
            <TextField
                className={classes.formControl}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                defaultValue={currValues.name}
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
                defaultValue={currValues.description}
                onChange={(e) =>
                    setDescription(e.target.value )
                }
            />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="assignUserLabel">Assign User</InputLabel>
                <Select 
                    labelId="assignUserLabel"
                    defaultValue={currValues.userIdAssigned}
                    onChange={assignUser}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {tempUserArray.map((user) => (
                        <MenuItem value={user}>{user}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className={classes.bottomStack}>
                <TextField
                    className={classes.timeEstimated}
                    id="outlined-number"
                    label="Time Estimated"
                    type="number"
                    defaultValue={currValues.time_estimated}
                    variant="outlined"
                    onChange={assignTimeEstimated}
                />

                <TextField
                    className={classes.timeEstimated}
                    id="outlined-number"
                    label="Time Completed"
                    defaultValue={currValues.time_elapsed}
                    type="number"
                    variant="outlined"
                    onChange={assignTimeCompleted}
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
                                <ColouredSwitch checked={flag} onChange={assignFlag} name="flag" />}
                            label="Flagged"
                            defaultValue={currValues.flag}
                        />
                    </FormControl>
                </div>
            </div>

            <div className={classes.bottomStack}>
                <Button variant="outlined" className={classes.editTaskButton} onClick={editTask}>Edit Task</Button>
                <Button variant="outlined" classes={{ root: classes.root }} className={classes.deleteTaskButton} onClick={deleteTask}>Delete Task</Button>
            </div>
        </div>
    </Card>
  );
};

export default TaskEditDetail;
