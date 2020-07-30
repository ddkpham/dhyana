import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import "./index.scss";

function EditProfile() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  useEffect(() => {
    function getProfile() {
      console.log("GET from", `${baseURL}/user/myProfile`)
      const url = `${baseURL}/user/myProfile`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          const { username, password, first_name, last_name } = payload.data[0]
          setPass(password)
          setFirstName(first_name)
          setLastName(last_name)
          setUsername(username)
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = async (user, name) => {
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
      <Card className={"edit-user-wrapper"}>
        <div className={"title"}>
          <h2>Edit Your Info</h2>
        </div>
        <div className="text-input-wrapper">
          <TextField
            className={"sign-up-text-input"}
            label="password"
            variant="outlined"
            value={password}
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="firstName"
            variant="outlined"
            value={first_name}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <TextField
            className={"sign-up-text-input"}
            label="lastName"
            variant="outlined"
            value={last_name}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="update-user-button">
          <Button variant="outlined" color="primary" onClick={update}>
            Update Information
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default EditProfile;
