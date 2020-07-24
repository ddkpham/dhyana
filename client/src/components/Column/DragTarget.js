import React from "react";
import { useDrop } from "react-dnd";

const DragTarget = ({ children, columnName }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "card",
        drop: (item, monitor) => {
            console.log("dropped onto", columnName);
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