import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import "./index.scss";
import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";

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
  const [teamInfo, showTeams] = useState([]);

  useEffect(() => {
    function getUser() {
      const url = `${baseURL}/user/profile/${username}`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          setUser(payload.data[0]);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);

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
          <h2 className="username">Username: {userInfo.username}</h2>
          <h2 className="name">
            Name: {userInfo.first_name} {userInfo.last_name}
          </h2>
          <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Team</InputLabel>
          <Select
            label="Team"
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            <MenuItem>Ten</MenuItem>
          </Select>
        </FormControl>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
