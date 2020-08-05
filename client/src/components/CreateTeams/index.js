import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import "./index.scss";

function CreateTeam() {
  const [name, setTeamName] = useState("");
  const [userInfo, setUser] = useState([]);

  useEffect(() => {
    function getProfile() {
      const url = `${baseURL}/user/my-profile`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          setUser(payload.data[0]);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getProfile();
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);

  const create = async () => {
    const url = `${baseURL}/team/create`;
    const body = { name };

    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        const { confirmation, message } = data;

        if (confirmation === "success") {
          const team_id = data.data.id;
          const user_id = userInfo.id;
          const addUserUrl = `${baseURL}/team/add-user`;
          const addUserBody = { team_id, user_id };
          console.log("body", addUserBody);

          postCall(addUserUrl, addUserBody)
            .then((response) => response.json())
            .then((payload) => {
              const { confirmation, message } = payload;
              console.log(payload);
              window.location.href = `${clientBaseURL}/home`;
            });
        } else {
          alert(`team was not created. Error: ${message}`);
        }
      });
  };

  return (
    <div id="mainDiv">
      <Card className={"sign-up-wrapper"}>
        <div className={"title"}>
          <h2>Create New Team</h2>
        </div>
        <div className="text-input-wrapper">
          <TextField
            className={"sign-up-text-input"}
            label="Team Name"
            variant="outlined"
            onChange={(event) => {
              setTeamName(event.target.value);
            }}
          />
        </div>
        <div className="sign-up-button">
          <Button variant="outlined" color="primary" onClick={create}>
            Create Team
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateTeam;
