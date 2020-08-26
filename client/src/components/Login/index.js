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
import Typography from "@material-ui/core/Typography";
import "./index.scss";
import { postCall } from "../../apiCalls/apiCalls";
import GuestLoginDialog from "./GuestLoginDialog";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();

  const login = async () => {
    const url = `${baseURL}/login`;
    const body = { username, password };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation } = data;
    console.log(data);
    if (confirmation === "success") {
      localStorage.setItem("auth-token", "success");
      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert("Username or Password Incorrect");
    }
  };

  const guestLogin = async () => {
    const url = `${baseURL}/login`;
    const body = { username: "guest", password: "guest" };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation } = data;
    console.log(data);
    if (confirmation === "success") {
      localStorage.setItem("auth-token", "success");
      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert("Server error: please email ddkpham@gmail.com");
    }
  };

  const keyPressed = (event) => {
    console.log("entered key pressed with event: ", event);
    if (event.key === "Enter") {
      login();
    }
  };

  const onChangeUsername = (input) => {
    console.log("before", input);
    const regex = /^[\w\-\s]+$/;
    if (regex.test(input) || input == "") {
      setUsername(input);
    }
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (value) => {
    setDialogOpen(false);
  };

  return (
    <div className={"outer-wrapper"}>
      <Card className={"login-inner-wrapper"}>
        <div className={"title-wrapper"}>
          <Typography variant="h4" color="secondary">
            Welcome 👋
          </Typography>
        </div>
        <div className="text-input-wrapper">
          <TextField
            className="login-text-input"
            label="username"
            variant="outlined"
            onKeyPress={keyPressed}
            value={username}
            onChange={(event) => {
              onChangeUsername(event.target.value);
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
              onKeyPress={keyPressed}
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
        <div className={"button-container"}>
          <GuestLoginDialog
            open={dialogOpen}
            onClose={handleClose}
            login={guestLogin}
          />
          <Button
            className={"button"}
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Login as guest
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
