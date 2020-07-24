import React, { useState } from "react";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { baseURL, clientBaseURL } from "../../config/settings";

Modal.setAppElement("#root");

const CreateTask = ({ show, onClose, column_id, project_id }) => {

  const [name, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const create = async () => {
    const url = `${baseURL}/project/task`;
    const body = { name, description, column_id, project_id };
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const { confirmation } = data;
    alert(confirmation)
    if (confirmation == "success") {
      localStorage.setItem("auth-token", "success");

      window.location.href = `${clientBaseURL}/project`;
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"close-btn-ctn"}>
        <h1 style={{ flex: "1 90%" }}> Create New Task</h1>
        <button className={"close-btn"} onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <h2>Task Name</h2>
        <TextField
          label="name"
          variant="outlined"
          onChange={(event) => {
            setTaskName(event.target.value);
          }}
        />
        <h2>Description</h2>
        <TextField
          label="description"
          variant="outlined"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <h2></h2>
        <Button variant="outlined" color="primary" onClick={create}>
          Create Task
        </Button>
      </div>
    </Modal>
  );
};

export default CreateTask;