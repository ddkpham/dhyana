import React, { Fragment, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { useDrag, useDrop } from "react-dnd";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function TaskDetail(props) {
    const [name, setName] = useState([]);
    const [description, setDescription] = useState([]);
    const [userIdCreated, setUserCreated] = useState([]);
    const [userIdAssigned, setUserAssigned] = useState([]);
    const [priority, setPriority] = useState([]);
    const [timeEstimated, setTimeEstimated] = useState([]);
    const [flag, setFlag] = useState([]);

    const createTask = () => {
        console.log("entered createTask")
        console.log("name", name, "description", description)
        const details = {name, description, userIdCreated, userIdAssigned, priority, timeEstimated, flag}
        props.addTask(details);
    }

  return (
    <Card className="col-task-wrapper">
        <div className="col-title-wrapper">
            <Typography className="title">Create a Task. 🥅</Typography>
        </div>
        <div className="col-input-wrapper">
            <TextField
            className="col-text-field"
            id="outlined-basic"
            label="Task name"
            variant="outlined"
            onChange={(e) =>
                setName(e.target.value)
            }
            />
            <TextField
            className="col-text-field"
            id="outlined-basic"
            label="Task description"
            variant="outlined"
            onChange={(e) =>
                setDescription(e.target.value )
            }
            />
            <Button onClick={createTask}>Create task</Button>
        </div>
    </Card>
  );
};

export default TaskDetail;
