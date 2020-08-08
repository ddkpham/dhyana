import React, { useState, useEffect } from "react";
import { baseURL } from "../../../config/settings";
import { getCall, postCall } from "../../../apiCalls/apiCalls";
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
import { fade, withStyles } from "@material-ui/core/styles";
import { cyan, grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Comment from "./commentCard";
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
  root: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.error.main, 0.25),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 45,
  },
  userField: {
    width: 300,
    height: 45,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  timeField: {
    width: 300,
    height: 45,
  },
  bottomStack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  middleStack: {
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
    height: 45,
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
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskEditDetailMainWrapper: {
    width: 600,
    maxHeight: 850,
    minHeight: 650,
    alignItems: "center",
  },
  addCommentButton: {
    width: 100,
    marginTop: 15,
    marginRight: 5,
    height: 45,
  },
  addCommentField: {
    width: 450,
    height: 45,
  },
  gridDiv: {
    width: 565,
    marginLeft: 15,
    marginRight: 15,
    overflow: "scroll",
    maxHeight: 150,
    border: "1px solid",
    borderColor: grey[400],
    borderRadius: 4,
  },
}));

function TaskEditDetail(props) {
  const classes = useStyles();
  const { currValues, team } = props;

  console.log("currValues.priority is: ", currValues.priority)
  const currPriority = priorities.find(priorityQuery);
  console.log("currPriority is: ", currPriority)

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
  const [userCreated, setUserCreated] = useState([]);
  const [currComment, setCurrComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentDisabled, setCommentDisabled] = useState(true);
  const [teamMembers, setTeamMembers] = useState(team);

//   function getPriority() {
//     const prioVal = priorities.find(priorityQuery);
//     console.log("prioVal is: ", prioVal)
//     return 
//     // return p.id === currValues.priority;
//   }

  function priorityQuery(p) {
      return p.id == (currValues.priority ?? 0)
  }

  async function getAllComments(task_id, team) {
    console.log("getting all comments for: ", task_id);
    const url = `${baseURL}/project/task/${task_id}/get-comments`;
    getCall(url)
        .then((response) => response.json())
        .then((payload) => {
            const { data: comments } = payload;
            if (comments.length) {
                for (var i = 0; i < comments.length; i++) {
                    for (var j = 0; j < team.length; j++) {
                    if (comments[i].user_id === team[j].id) {
                        comments[i].username = team[j].username;
                        break;
                    }
                    }
                }
                console.log("comments are: ", comments);
                setAllComments(comments);
                // Scroll to bottom of comments
                var gridDiv = document.getElementById("gridDiv");
                gridDiv.scrollTop = gridDiv.scrollHeight;
            }
        })
        .catch((err) => console.log("getUserCreated fetch error", err));
  }

  useEffect(() => {
    async function getUserCreatedInfo() {
        const url = `${baseURL}/user/info/${currValues.user_id_created}`;
        getCall(url)
          .then((response) => response.json())
          .then((payload) => {
            console.log("getUserCreated success", payload);
            setUserCreated(payload.data);
          })
          .catch((err) => console.log("getUserCreated fetch error", err));
    }  
    getUserCreatedInfo();
    getAllComments(currValues.id, team);
  }, [currValues.user_id_created, currValues.id, team]);

  const editTask = () => {
    const timeEstimated = parseFloat(time_estimated);
    console.log("user_id_assigned before parse: ", user_id_assigned);

    const userIdAssigned = user_id_assigned === "" ? null : user_id_assigned;

    const updatedValues = {
      id: currValues.id,
      name,
      description,
      user_id_assigned: userIdAssigned,
      priority: priority || null,
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

  const setComment = (event) => {
    console.log("event value is: ", event.target.value);
    setCurrComment(event.target.value);
    if (event.target.value !== "") {
      setCommentDisabled(false);
    } else {
      setCommentDisabled(true);
    }
  };

  const submitComment = () => {
    console.log(
      "TaskEditDetail - entered submitComment with comment: ",
      currComment,
      ", task_id: ",
      currValues.id
    );

    const url = `${baseURL}/project/task/${currValues.id}/create-comment`;
    console.log(url);
    const body = {
      description: currComment,
    };

    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("Submit Comment Response", data);
        setCurrComment("");
        var addCommentField = document.getElementById("addCommentField");
        addCommentField.value = "";
        setCommentDisabled(true);
        getAllComments(currValues.id, team);
      })
      .catch((err) => console.log("Submit Comment Error", err));
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
          rows={3}
          variant="outlined"
          defaultValue={currValues.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={classes.middleStack}>
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
              {teamMembers.map((user) => (
                <MenuItem value={user.id}>
                  {user.username} - {user.first_name} {user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={classes.middleStack}>
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
              defaultValue={priority.id}
              onChange={assignPriority}
              className={classes.priority}
            >
              {priorities.map((priority) => (
                <MenuItem value={priority.id}>{priority.name}</MenuItem>
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

        {allComments.length > 0 ? (
          <div id="gridDiv" className={classes.gridDiv}>
            <Grid container zeroMinWidth className={classes.allCommentsTable}>
              <Paper elevation={2}>
                {allComments?.map((comment) => {
                  console.log("TaskEditDetail -> comment", comment);
                  return (
                    <Comment
                      description={comment.description}
                      username={comment.username}
                      date_created={comment.date_created}
                    />
                  );
                })}
              </Paper>
            </Grid>
          </div>
        ) : null}

        <div className={classes.addCommentDiv}>
          <TextField
            className={classes.addCommentField}
            id="addCommentField"
            label="Leave a Comment"
            multiline
            rows={1}
            variant="outlined"
            defaultValue=""
            onChange={(e) => setComment(e)}
          />
          <Button
            variant="outlined"
            id="addCommentButton"
            className={classes.addCommentButton}
            onClick={submitComment}
            disabled={commentDisabled}
          >
            Comment
          </Button>
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
