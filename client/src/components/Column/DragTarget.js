import React from "react";
import { useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dropWrapper: {
        height: "100%",
    },
    onHover: {
        backgroundColor: theme.colours.mint
    }
}));

const DragTarget = ({ children, columnName, onDrop }) => {

    const classes = useStyles();

    const [{ isOver }, drop] = useDrop({
        accept: "card",
        drop: (item, monitor) => {
            console.log(item, "dropped onto", columnName);
            console.log("what's monitor?", monitor);
            onDrop(item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });

    const dropClasses = isOver ? classes.dropWrapper + ' ' + classes.onHover : classes.dropWrapper

    return (
        <div ref={drop} className={dropClasses}>
            {React.cloneElement(children)}
        </div>
    )
};

export default DragTarget;