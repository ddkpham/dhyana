import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import GroupIcon from "@material-ui/icons/Group";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./index.scss";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardDiv: {
    marginTop: 25,
  },
}));

function CreateTeam() {
  let history = useHistory();
  const classes = useStyles();
  const [name, setTeamName] = useState("");
  const [userInfo, setUser] = useState([]);

  useEffect(() => {
    function getProfile() {
      const url = `${baseURL}/user/my-profile`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
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

          postCall(addUserUrl, addUserBody)
            .then((response) => response.json())
            .then((payload) => {
              // window.location.href = `${clientBaseURL}/home`;
              history.push("/home");
            });
        } else {
          alert(`team was not created. Error: ${message}`);
        }
      });
  };

  const onChange = (input) => {
    console.log("before", input);
    const regex = /^[\w\-\s]+$/;
    if (regex.test(input) || input == "") {
      console.log("after", input);
      setTeamName(input);
    }
  };

  return (
    <div className={classes.mainDiv}>
      <div className="buttonDiv">
        <Button
          className="backButton"
          variant="outlined"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </div>
      <div className={classes.cardDiv}>
        <Card className={"sign-up-wrapper"}>
          <div className={"title"}>
            <Typography variant="h4" color="secondary">
              Create New Team
            </Typography>
            <GroupIcon
              className="group-icon"
              color="primary"
              style={{ fontSize: 40 }}
            />
          </div>
          <div className="text-input-wrapper">
            <TextField
              className={"sign-up-text-input"}
              label="Team Name"
              variant="outlined"
              value={name}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <div className="sign-up-button">
            <Button variant="outlined" color="primary" onClick={create}>
              Create Team
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateTeam;
