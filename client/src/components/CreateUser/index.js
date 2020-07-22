import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./index.scss";


function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const login = async (user, name) => {
    const url = `${baseURL}/users/create`;
    const body = { username, password, first_name, last_name };
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const { confirmation } = data;
    alert(confirmation)
    // const { confirmation } = "success"
    if (confirmation == "User created successfully.") {
      localStorage.setItem("auth-token", "success");

      window.location.href = `${clientBaseURL}/home`;
    }
  };

  return (
    <div id="mainDiv">
      <h2>Create New User</h2>
      <div className="text-input">
        <TextField
          label="username"
          variant="outlined"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          label="password"
          variant="outlined"
          onChange={(event) => {
            setPass(event.target.value);
          }}
        />
        <TextField
          label="firstName"
          variant="outlined"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <TextField
          label="lastName"
          variant="outlined"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={login}>
          Create User
        </Button>
      </div>
    </div>
  );
}

export default CreateUser;
