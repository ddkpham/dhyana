import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import { useHistory } from "react-router-dom";
import "./index.scss";

function EditProfile() {
  let history = useHistory();
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    function getProfile() {
      console.log("GET from", `${baseURL}/user/my-profile`);
      const url = `${baseURL}/user/my-profile`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          setProfileInfo(payload.data[0]);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = async (user, name) => {
    const url = `${baseURL}/user/edit-user`;
    const {
      password,
      first_name,
      last_name,
      biography,
      job_title,
    } = profileInfo;
    const body = { password, first_name, last_name, biography, job_title };
    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log(data);
    if (confirmation === "success") {
      history.goBack();
    } else {
      alert(message);
    }
  };

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
      <div id="mainDiv">
        <Card className={"edit-user-wrapper"}>
          <div className={"title"}>
            <h2>Edit Your Info 🗄️ </h2>
          </div>
          <div className="text-input-wrapper">
            <TextField
              className={"sign-up-text-input"}
              label="password"
              variant="outlined"
              value={profileInfo.password || ""}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  password: event.target.value,
                });
              }}
            />
            <TextField
              className={"sign-up-text-input"}
              label="firstName"
              variant="outlined"
              value={profileInfo.first_name || ""}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  first_name: event.target.value,
                });
              }}
            />
            <TextField
              className={"sign-up-text-input"}
              label="lastName"
              variant="outlined"
              value={profileInfo.last_name || ""}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  last_name: event.target.value,
                });
              }}
            />
            <TextField
              className={"sign-up-text-input"}
              label="jobTitle"
              variant="outlined"
              value={profileInfo.job_title || ""}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  job_title: event.target.value,
                });
              }}
            />
            <TextField
              className={"sign-up-text-input"}
              label="biography"
              variant="outlined"
              multiline
              rows={4}
              value={profileInfo.biography || ""}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  biography: event.target.value,
                });
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
    </div>
  );
}

export default EditProfile;
