import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall } from "../../apiCalls/apiCalls";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
  },
  mainCard: {
    width: 450,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonCreateUser: {
    marginBottom: 20,
    justifyContent: "center",
  },
  backButton: {
    marginRight: 15,
  }
}));


function CreateUser() {
  const classes = useStyles();  
  let history = useHistory();

  const [username, setUsername] = useState("");
  console.log("CreateUser -> username", username);
  const [password, setPass] = useState("");
  const [passwordConfirm, setConfirmPass] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const create = async (user, name) => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match")
      return
    }
    const url = `${baseURL}/user/create`;
    const body = { username, password, first_name, last_name };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log(data);
    if (confirmation === "success") {
      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert(message);
    }
  };

  return (
    <div className={classes.mainDiv}>
      <Card className={classes.mainCard}>
        <div className={classes.title}>
          <Typography variant="h4">Create an Account</Typography>
        </div>
        <div className="text-input-wrapper">
          <TextField
            className={"sign-up-text-input"}
            label="Username"
            variant="outlined"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="Password"
            variant="outlined"
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="Confirm Password"
            variant="outlined"
            onChange={(event) => {
              setConfirmPass(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="First Name"
            variant="outlined"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="Last Name"
            variant="outlined"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className={classes.buttonCreateUser}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.backButton}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          <Button variant="outlined" color="primary" onClick={create}>
            Create User
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateUser;
