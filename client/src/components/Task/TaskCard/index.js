import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { useDrag, useDrop } from "react-dnd";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core';
import TaskEditDetail from "../TaskEditDetail";
import { getCall } from "../../../apiCalls/apiCalls";
import { baseURL } from "../../../config/settings";
import { red, cyan, grey } from "@material-ui/core/colors";


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
  card: {
    zIndex: '1',
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
  priorityColourDiv: {
    height: "auto",
    width: 10,
    borderRight: "0.5px solid black",
    marginRight: 8,
  },
  contentDiv: {
    padding: 5,
    paddingLeft: 0,
    width: "100%",
  },
  containerDiv: {
    display: 'flex',
    justifyContent: 'left',
  },
  nameDiv: {
    borderBottom: "0.5px solid lightgrey",
    textAlign: 'center',
    paddingRight: 10,
  }
}));

const Task = ({ task, index, priorityColor, backgroundColor, deleteTask, editTask, team }) => {
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
          console.log("userAssigned is:", payload.data);
          if (payload.data) {
            setUserAssigned(payload.data);
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
    // set priority colour
    var prioDiv = document.getElementById(`prioDiv.${updatedValues.id}`);
    const newPrioColor = setPriorityTaskColor(updatedValues.priority)
    prioDiv.style.backgroundColor = newPrioColor

    // set background colour
    var cardDiv = document.getElementById(`cardDiv.${updatedValues.id}`);
    console.log("is updatedValues.timeElapsed: ", updatedValues.time_elapsed)
    console.log("is updatedValues.time_estimated: ", updatedValues.time_estimated)
    const isOverdue = updatedValues.time_elapsed > updatedValues.time_estimated
    console.log("is overdue: ", isOverdue)
    const newBackgroundColor = setNewBackgroundColor(updatedValues.flag, isOverdue)
    cardDiv.style.backgroundColor = newBackgroundColor

    setAnchor( null );
  }

  const setPriorityTaskColor = (priority) => {
    console.log("entered setPriorityTaskColor with priority: ", priority)
    const prioInt = parseInt(priority)
    switch (prioInt) {
        case 5:
          return red[600]
        case 4:
          return red[300]
        case 3:
          return "orange"
        case 2:
          return "yellow"
        case 1:
          return "lightgreen"
        default:
          return cyan[50]
    }
  }

  const setNewBackgroundColor = (flag, isOverdue) => {
    if (flag) {
      return grey[200]
    } else if (isOverdue) {
      return red[100]
    } else {
      return "white"
    }
  }

  drag(drop(ref));

  const open = Boolean(anchor);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.mainDiv}>
      <Card
        raised
        style={{ opacity: isDragging ? 0.2 : 1, minHeight: 0, backgroundColor: backgroundColor }}
        id={"cardDiv." + task.id}
        ref={ref}
        className={classes.card}
        onClick={handleClick}
      >
      <div className={classes.containerDiv}>
        <div 
            id={"prioDiv." + task.id} 
            className={classes.priorityColourDiv} 
            style={{backgroundColor: priorityColor}}
        />
        <div className={classes.contentDiv}>
          <div className={classes.nameDiv}>
            <Typography style={{fontWeight: 425}} variant="body1">
              {task.name}
            </Typography>
          </div>
          <div style={{paddingLeft: 5, paddingTop: 2}}>
            <Typography variant="body2" style={{fontWeight: 450}}>
              {userAssigned.username}
            </Typography>
            { task.time_estimated ? (
              <Typography variant="body2">{timeElapsed}/{task.time_estimated} Hrs Completed</Typography>
            ) : (null)}
          </div>
        </div>
      </div>
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
