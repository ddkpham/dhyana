import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./index.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");

  const login = async (user, name) => {
    const url = `${baseURL}/login`;
    const body = { username, password };
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

      window.location.href = `${clientBaseURL}/home`;
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
