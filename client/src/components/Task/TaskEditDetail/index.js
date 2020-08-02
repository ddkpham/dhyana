import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
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
        width: 270,
    },
    priorityFlagStack: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    flagDiv: {
        alignItems: 'right',
        justifyContent: 'right',
        width: 270,
        paddingLeft: 100,
    },
    createTaskTitle: {
        width: "100%",
        marginTop: 25,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskEditDetailMainWrapper: {
        width: 600,
        height: 650,
        alignItems: 'center',
        alignItems: 'center',
    }
  }));

function TaskEditDetail(props) {
    const classes = useStyles();
    const { currValues } = props;
    console.log("currValues: ", currValues)

    const tempUserArray = ["person1", "person2", "person3"]
    const prioritiesArray = ["5 - blocker", "4 - critical", "3 - high", "2 - medium", "1 - low", "0 - None"]
    const currPriority = prioritiesArray.find(getPriority)

    const [name, setName] = useState(currValues.name);
    const [description, setDescription] = useState(currValues.description);
    const [user_id_assigned, setUserAssigned] = useState(currValues.user_id_assigned);
    const [priority, setPriority] = useState(currPriority);
    const [time_estimated, setTimeEstimated] = useState(currValues.time_estimated);
    const [time_elapsed, setTimeCompleted] = useState(currValues.time_elapsed);
    const [flag, setFlag] = useState(currValues.flag);

    function getPriority(p) {
        return p.charAt(0) == currValues.priority
    }

    const editTask = () => {
        console.log("TaskEditDetail - entered editTask with task currValues: ", currValues)
        const priorityInt = priority == "" ? null : priority.charAt(0)
        const updatedValues = {
                            id: currValues.id,
                            name, 
                            description, 
                            user_id_assigned, 
                            priority: priorityInt, 
                            time_estimated, 
                            time_elapsed,
                            flag,
                        }
                        console.log("TaskEditDetail - editTask updatedValues: ", updatedValues)
        props.editTask(updatedValues);
    }

    const deleteTask = () => {
        console.log("TaskEditDetail - entered deleteTask with taskId: ", currValues.id)
        props.deleteTask()
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
    <Card className={classes.taskEditDetailMainWrapper}>
        <Typography className={classes.createTaskTitle} variant="h4">Edit Task. 🥅</Typography>
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
                className={classes.description}
                id="outlined-basic"
                label="Task description"
                multiline
                rows={4}
                variant="outlined"
                defaultValue={currValues.description}
                onChange={(e) =>
                    setDescription(e.target.value )
                }
            />
            <div className={classes.bottomStack}>
                <TextField 
                    labelId="createdUserLabel"
                    defaultValue={currValues.user_id_created}
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
                        <MenuItem value=""><em>None</em></MenuItem>
                        {tempUserArray.map((user) => (
                            <MenuItem value={user}>{user}</MenuItem>
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
                />

                <TextField
                    className={classes.timeField}
                    id="outlined-number"
                    label="Time Completed (hr)"
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
