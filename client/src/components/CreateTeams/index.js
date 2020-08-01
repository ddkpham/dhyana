import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import "./index.scss";

function CreateTeam() {
  const [name, setTeamName] = useState("");

  const create = async () => {
    const url = `${baseURL}/team/create`;
    const body = { name };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log(data)
    if (confirmation === "success") {
      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert(message)
    }
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
