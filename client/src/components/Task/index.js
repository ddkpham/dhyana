// import React from "react";
// import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
// import { useDrag } from 'react-dnd'

// function Task({task}){
//     const [{isDragging}, drag] = useDrag({
//         item: { type: 'card' }, //TODO: move into const file
//         collect: monitor => ({
//             isDragging: !!monitor.isDragging(),
//         }),
//     });

//     if(isDragging) return null

//     return (
//         <div ref={drag}>
//         <Card raised>
//             <CardActionArea>
//                 <CardContent>
//                     <Typography variant="body1" gutterBottom>{task.name}</Typography>
//                     <Typography variant="body2">{task.description}</Typography>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//         </div>
//     );
// }

// export default Task;

import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Task = ({ task, index, moveItem }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "card",
        hover(task, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = task.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            task.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: "card", ...task, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });


    drag(drop(ref));

    if(isDragging) return null

    return (
        <Card raised
            ref={ref}
            style={{ opacity: isDragging ? 0 : 1 }}
        >
                <p>{task.name}</p>
                <p>{task.description}</p>
        </Card>
    );
};

export default Task;