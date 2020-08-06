import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";

function MyProfile() {
  let history = useHistory();
  const [ProfileInfo, setProfile] = useState({});

  useEffect(() => {
    function getProfile() {
      console.log("GET from", `${baseURL}/user/my-profile`);
      const url = `${baseURL}/user/my-profile`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("payload", payload);
          setProfile(payload.data[0]);
        })
        .catch((err) => console.log("project fetch error", err));
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("ProfileInfo", ProfileInfo);
  }, [ProfileInfo]);

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

      <div className="profile-container">
        <Card className="profile-profileDiv">
          <CardContent>
            <AccountBoxIcon />
            <Typography variant="h5" color="primary">
              Username: {ProfileInfo.username}
            </Typography>
            <Typography variant="h6" color="secondary">
              first name:{" "}
              {ProfileInfo.first_name ? ProfileInfo.first_name : "None of"}
            </Typography>
            <Typography variant="h6" color="secondary">
              last name:{" "}
              {ProfileInfo.last_name ? ProfileInfo.last_name : "Your business"}
            </Typography>
            <Typography variant="h6" color="secondary">
              job title:{" "}
              {ProfileInfo.job_title
                ? ProfileInfo.job_title
                : "CEO of mind your own"}
            </Typography>
            <Typography variant="h6" color="secondary">
              Biography:{" "}
            </Typography>
            <TextareaAutosize
              rowsMax={5}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue={
                ProfileInfo.biography
                  ? ProfileInfo.biography
                  : "Please respect my privacy. I'm a private person."
              }
            />
          </CardContent>
        </Card>
      </div>

      <div className="container2">
        <div className="buttonDiv">
          <Button
            className="editButton"
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/edit-profile");
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
