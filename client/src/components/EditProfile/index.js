import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import { useHistory } from "react-router-dom";
import DeleteAccountDialog from "./DeleteAccountDialog";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.error.main, 0.25),
    },
  },
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 25,
  },
  mainCard: {
    width: 450,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: 15,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonCreateUser: {
    marginBottom: 20,
    justifyContent: "center",
  },
  backButton: {
    marginRight: 15,
  },
  deleteTaskButton: {
    marginRight: 5,
  }
}));

function EditProfile() {
  const classes = useStyles();  
  let history = useHistory();
  const [profileInfo, setProfileInfo] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    function getProfile() {
      console.log("GET from", `${baseURL}/user/my-profile`);
      const url = `${baseURL}/user/my-profile`;
      getCall(url)
        .then((response) => response.json())
        .then((payload) => {
          console.log("getProfile -> payload", payload);
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
      alert("Successfully updated your profile! 🤗");
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
      <div className={classes.mainDiv}>
        <Card className={classes.mainCard}>
          <div className={classes.title}>
            <Typography variant="h4">Edit your Info</Typography>
          </div>
          <div className="text-input-wrapper">
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
              label="password"
              variant="outlined"
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  password: event.target.value,
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
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleClickOpen();
                }}
                classes={{ root: classes.root }}
                className={classes.deleteTaskButton}
              >
                Delete Account
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={update}
              className="edit-profile-btn"
            >
              Update Info
            </Button>
            <DeleteAccountDialog
              open={open}
              onClose={handleClose}
              user={profileInfo}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EditProfile;
