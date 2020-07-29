import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { getCall } from "../../apiCalls/apiCalls";

function ProfilePage(props) {
  const { username } = props;
  let history = useHistory();
  const [userInfo, setUser] = useState([]);

  useEffect(() => {
    function getUser() {
      const url = `${baseURL}/user/${username}`;
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
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
