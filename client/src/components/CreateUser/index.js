import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import "./index.scss";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const create = async (user, name) => {
    const url = `${baseURL}/user/create`;
    const body = { username, password, first_name, last_name };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation } = data;
    alert(confirmation);
    if (confirmation === "success") {
      window.location.href = `${clientBaseURL}/home`;
    }
  };

  return (
    <div id="mainDiv">
      <Card className={"sign-up-wrapper"}>
        <div className={"title"}>
          <h2>Sign Up 🆕</h2>
        </div>
        <div className="text-input-wrapper">
          <TextField
            className={"sign-up-text-input"}
            label="username"
            variant="outlined"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="password"
            variant="outlined"
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="firstName"
            variant="outlined"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="lastName"
            variant="outlined"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="sign-up-button">
          <Button variant="outlined" color="primary" onClick={create}>
            Create User
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateUser;
