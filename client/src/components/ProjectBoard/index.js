import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CreateTask from "./CreateTask";
import Item from "./Item";
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import { data, statuses } from "../data";
import "./index.css";

const ProjectBoard = (props) => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  return (
    <div className={"row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h2 className={"col-header"}> {s.status.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.status === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                    />
                  ))}
              </Col>
            </DropWrapper>
            <Button onClick={onOpen}>Create Task</Button>
            {items
              .filter((i) => i.status === s.status)
              .map((i, idx) => (
                //hard coded for now because no project_id
                <CreateTask column_id ={idx} project_id ={7} onClose={onClose} show={show} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectBoard;
