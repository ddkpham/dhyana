import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { postCall, getCall } from "../../../apiCalls/apiCalls";
import { baseURL } from "../../../config/settings";
import { useHistory } from "react-router-dom";

import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const { onClose, selectedValue, open, user } = props;
  const history = useHistory();
  console.log("SimpleDialog -> user", user);

  const handleClose = () => {
    onClose();
  };

  const logout = async () => {
    const url = `${baseURL}/login/clear-cookie`;
    const response = await getCall(url);
    const data = await response.json();
    const { confirmation } = data;
    if (confirmation === "success") {
      localStorage.removeItem("auth-token");
    } else {
      console.log("failed to clear session cookie");
    }
  };

  const deleteAccount = async () => {
    console.log("deleting account");
    console.log("SimpleDialog -> username", username);
    if (username != user.username) {
      alert("username does not match. Are you getting cold feet? 🧊👣");
      setUsername("");
      return;
    }

    // log user out

    const url = `${baseURL}/user/delete`;
    const body = { id: user.id };
    const response = await postCall(url, body);
    const payload = await response.json();

    if (payload.confirmation == "success") {
      alert("good bye friend 👋");
      await logout(); // log user out
      history.push("/home");
      window.location.reload(false);
    } else {
      alert("error occurred in account deletion");
    }
    console.log("deleteAccount -> payload", payload);
  };

  return (
    <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <div className={classes.mainDiv}>
        <DialogTitle id="simple-dialog-title">
          We're sad to see you go 😢{" "}
        </DialogTitle>
        <Typography>Confirm account deletion with username</Typography>
        <List>
          <ListItem button key={"confirm-deletion"}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <SentimentDissatisfiedIcon />
              </Avatar>
            </ListItemAvatar>
            <TextField
              id="outlined-basic"
              label="Confirm Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </ListItem>
          <ListItem autoFocus button onClick={deleteAccount}>
            <ListItemAvatar>
              <Avatar>
                <DeleteForeverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete account" />
          </ListItem>
        </List>
        </div>
    </Dialog>
  );
}

export default SimpleDialog;
