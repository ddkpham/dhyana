import React, { Fragment, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { useDrag, useDrop } from "react-dnd";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core';
import TaskEditDetail from "../TaskEditDetail";
import { postCall, getCall, deleteCall } from "../../../apiCalls/apiCalls";
import { baseURL } from "../../../config/settings";



const useStyles = makeStyles((theme) => ({
  popover: {
    padding: "5px",
    height: "100%",
  },
  taskDetail: {
    padding: "5px",
    height: "100%",
  },
}));

const Task = ({ task, index, moveItem }) => {
  const ref = useRef(null);
  const classes = useStyles();
  const timeElapsed = task.time_elapsed ? task.time_elapsed : 0
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    console.log("Column -> handleClick -> event", event);
    setAnchor( event.currentTarget );
  };

  const handleClose = () => {
    setAnchor( null );
  };

  const editTask = (details) => {
    console.log("sending addTask to server")
    const {name, description, userIdAssigned, priorityInt, timeEstimated, flag} = details;
    const { projectId, column } = this.props;
    const url = `${baseURL}/project/task`;
    const body = {
      name: name,
      description: description,
      user_id_assigned: userIdAssigned,
      priority: priorityInt,
      time_estimated: timeEstimated,
      flag: flag,
      column_id: column.id,
      project_id: projectId,
    };
    console.log("details: ", body)
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch tasks success", data);
        this.handleClose();
        window.location.reload(false);
      });
  };

  const [, drop] = useDrop({
    accept: "card",
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", ...task, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  if (isDragging) return null;

  const open = Boolean(anchor);
  console.log("Column -> render -> open", open);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Card raised ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              {task.name}
            </Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Typography variant="body2">{task.priority}</Typography>
            { task.time_estimated ? (
              <Typography variant="body2">{timeElapsed}/{task.time_estimated} Hours Completed</Typography>
            ) : (null)}
            </CardContent>
        </CardActionArea>
      </Card>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.popover}
      >
        <TaskEditDetail addTask={editTask.bind(this)} className={classes.taskDetail} currValues={task}/>
      </Popover>
    </div>
  );
};

export default Task;
