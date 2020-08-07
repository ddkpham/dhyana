import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useDrag, useDrop } from "react-dnd";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core';
import TaskEditDetail from "../TaskEditDetail";
import { postCall, getCall, deleteCall } from "../../../apiCalls/apiCalls";
import { baseURL } from "../../../config/settings";



const useStyles = makeStyles((theme) => ({
  popover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskDetail: {
    padding: "5px",
    height: "100%",
  },
  addTaskButton: {
    marginTop: 25,
  },
  card: {
    zIndex: '1',
    '&:hover': {
      backgroundColor: 'lightgrey',
    }
  }
}));

const Task = ({ task, index, moveItem, deleteTask, editTask, team }) => {
  const ref = useRef(null);
  const classes = useStyles();
  const timeElapsed = task.time_elapsed ? task.time_elapsed : 0
  const [anchor, setAnchor] = useState(null);
  const [userAssigned, setUserAssigned] = useState([]);

  useEffect(() => {
    async function getUserAssignedInfo() {
      const url = `${baseURL}/user/info/${task.user_id_assigned}`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          if (payload.data[0]) {
            setUserAssigned(payload.data[0]);
          } else {
            setUserAssigned([]);
          }
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getUserAssignedInfo();
  }, [task]);

  const handleClick = (event) => {
    console.log("Column -> handleClick -> event", event);
    setAnchor( event.currentTarget );
  };

  const handleClose = () => {
    setAnchor( null );
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

  const deleteT = () => {
    console.log("entered deleteT")
    deleteTask(task.id)
  }

  const editT = (updatedValues) => {
    console.log("entered editT with: ", updatedValues)
    editTask(updatedValues)
    setAnchor( null );
  }

  drag(drop(ref));

  const open = Boolean(anchor);
  // console.log("Column -> render -> open", open);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Card
        raised
        style={{ opacity: isDragging ? 0.2 : 1 }}
        ref={ref}
        className={classes.card}
        onClick={handleClick}
      >
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {task.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {userAssigned.username}
          </Typography>
          <Typography variant="body2">{task.description}</Typography>
          <Typography variant="body2">{task.priority}</Typography>
          { task.time_estimated ? (
            <Typography variant="body2">{timeElapsed}/{task.time_estimated} Hours Completed</Typography>
          ) : (null)}
        </CardContent>
    </Card>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorReference={"none"}
          classes={{
            root: classes.popover,
          }}
      >
        <TaskEditDetail 
            className={classes.taskDetail} 
            currValues={task} 
            deleteTask={deleteT.bind(this)}
            editTask={editT.bind(this)}
            team={team}
        />
      </Popover>
    </div>
  );
};

export default Task;
