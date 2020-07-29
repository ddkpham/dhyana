import React, { Fragment, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { useDrag, useDrop } from "react-dnd";

const Task = ({ task, index, moveItem }) => {
  const ref = useRef(null);

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

  return (
    <Card raised ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {task.name}
          </Typography>
          <Typography variant="body2">{task.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Task;
