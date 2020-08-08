import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Avatar from "@material-ui/core/Avatar";
import grossGary from "../../static/gross_gary.png";
import { images } from "../../static/finalspace/avatars";

import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";

function MyProfile() {
  let history = useHistory();
  const [ProfileInfo, setProfile] = useState({});
  const imgIndex = Math.floor(Math.random() * images.length);
  console.log("MyProfile -> ProfileInfo", ProfileInfo);

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
            <div className="profile-container-center">
              <Avatar
                alt={ProfileInfo.username}
                src={images[imgIndex]}
                className="profile-my-avatar"
              />
              <Typography variant="h5" color="primary">
                {ProfileInfo.first_name || "John"}{" "}
                {ProfileInfo.last_name || "Doe"}
              </Typography>
              <Typography variant="h5" color="primary">
                @{ProfileInfo.username}
              </Typography>
              <Typography variant="h6" color="secondary">
                Title:{" "}
                {ProfileInfo.job_title || "No job title. Click update to add. "}
              </Typography>
              <Typography variant="h6" color="secondary">
                About me:{" "}
              </Typography>
              <TextField
                id="outlined-multiline-static"
                label="Biography"
                multiline
                rows={4}
                defaultValue={"No biography. click update to add."}
                value={ProfileInfo.biography}
                variant="outlined"
              />
            </div>
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
