import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

import "./index.scss";
import { postCall } from "../../apiCalls/apiCalls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();

  const login = async (user, name) => {
    const url = `${baseURL}/login`;
    const body = { username, password };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log(data);
    if (confirmation === "success") {
      localStorage.setItem("auth-token", "success");

      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert(message);
    }
  };

  return (
    <div className={"outer-wrapper"}>
      <Card className={"login-inner-wrapper"}>
        <div className={"title-wrapper"}>
          <h2 className={"title"}>Login 👋</h2>
        </div>
        <div className="text-input-wrapper">
          <TextField
            className="login-text-input"
            label="username"
            variant="outlined"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            className="login-text-input"
            label="password"
            variant="outlined"
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
        </div>
        <div className={"button-container"}>
          <Button
            className={"button"}
            variant="outlined"
            color="primary"
            onClick={login}
          >
            Login
          </Button>
          <Button
            className={"button"}
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/create-user");
            }}
          >
            Sign Up
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
