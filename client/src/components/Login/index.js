import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

import "./index.scss";
import { postCall } from "../../apiCalls/apiCalls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

          <FormControl className="password-textfield" variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
