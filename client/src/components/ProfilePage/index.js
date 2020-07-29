import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { useHistory } from "react-router-dom";

function ProfilePage(props) {
  let history = useHistory();
  const { username } = props;
  const [userInfo, setUser] = useState([]);

  useEffect((props) => {
    const { username } = props;
    function getUser() {
      const url = `${baseURL}/user/${username}`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      })
      .then(response => response.json())
      .then(payload => {
        console.log("payload", payload)
        setUser(payload.data[0]);
      })
      .catch(err => console.log("project fetch error", err));
    }
      getUser();
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo)
  }, [userInfo]);


  return (
    <div>
      <div className="buttonDiv">
        <Button 
          className="backButton"
          variant="outlined"
          color="primary"
          onClick={() => history.goBack()}>Back
        </Button>
      </div>

      <div className="container">
        <div className="profileDiv">
          <h2 className="username">Username: {userInfo.username}</h2>
          <h2 className="name">Name: {userInfo.first_name} {userInfo.last_name}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
