import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { postCall, getCall } from "../../apiCalls/apiCalls";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ProfilePage(props) {
  const classes = useStyles();
  const { username } = props;
  let history = useHistory();
  const [userInfo, setUser] = useState([]);
  const [detailedInfo, setUserInfo] = useState([]);
  const [teamInfo, showTeams] = useState([]);
  const [team_id, getTeamId] = useState("");

  console.log("Team id", team_id);
  console.log("user_id", userInfo.id);

  const addUserToTeam = async () => {
    const url = `${baseURL}/team/addUser`;
    const user_id = userInfo.id;
    const body = { team_id, user_id };

    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log(data);
    if (confirmation === "success") {
      alert(`Success: ${message}`);
      window.location.href = `${clientBaseURL}/home`;
    } else {
      alert(`Error: ${message}`);
    }
  };

  useEffect(() => {
    function getUser() {
      const url = `${baseURL}/user/profile/${username}`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          setUser(payload.data[0]);
          //console.log("data->", payload.data[0].id);
          const userId = payload.data[0].id;
          const url = `${baseURL}/user/info/${userId}`;
          getCall(url)
            .then((response) => response.json())
            .then((data) => {
              console.log("detailedUserInfo", data);
              setUserInfo(data.data[0]);
            }).catch((err) => console.log("project fetch error", err));
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getUser();
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);

  // useEffect(() => {
  //   function getUserInfo() {
  //     const userId = userInfo.id;
  //     const url = `${baseURL}/user/info/${userId}`;
  //     getCall(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("payload", data);
  //         setUserInfo(data.data[0]);
  //       })
  //       .catch((err) => console.log("project fetch error", err));
  //   }
  //   getUserInfo();
  // }, []);

  useEffect(() => {
    function getTeams() {
      const url = `${baseURL}/team/all`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          showTeams(payload.data);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getTeams();
  }, []);

  useEffect(() => {
    console.log("teamInfo", teamInfo);
  }, [teamInfo]);

  return (
    <div>
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

      <div className="container">
        <div className="profileDiv">
          <h2>
            {userInfo.first_name} {userInfo.last_name}
          </h2>
          <p className="user">@{userInfo.username}</p>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel>Team</InputLabel>
            <Select
              label="Team"
              onChange={(event) => {
                getTeamId(event.target.value);
              }}
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              {teamInfo.map((info) => (
                <MenuItem value={info.id} key={info.id}>
                  {info.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button variant="outlined" color="primary" onClick={addUserToTeam}>
              Add User to Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
