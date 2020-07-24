import React from "react";
import { useDrop } from "react-dnd";

const DragTarget = ({ children, columnName, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "card",
        drop: (item, monitor) => {
            console.log(item, "dropped onto", columnName);
            console.log("what's monitor?", monitor);
            onDrop(item)
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children)}
        </div>
    )
};

export default DragTarget;