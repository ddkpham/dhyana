import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";

function MyProfile() {
  let history = useHistory();
  const [ProfileInfo, setProfile] = useState([]);

  useEffect(() => {
    function getProfile() {
      console.log("GET from", `${baseURL}/user/myProfile`)
      const url = `${baseURL}/user/myProfile`;
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

      <div className="container">
        <div className="profileDiv">
          <h2 className="username">Username: {ProfileInfo.username}</h2>
          <h2 className="name">
            Name: {ProfileInfo.first_name} {ProfileInfo.last_name}
          </h2>
        </div>
      </div>

      <div className="container2">
        <div className="buttonDiv">
          <Button
            className="editButton"
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/editProfile");
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
