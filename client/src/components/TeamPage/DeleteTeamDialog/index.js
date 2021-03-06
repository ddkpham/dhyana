import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { postCall, getCall } from "../../../apiCalls/apiCalls";
import { baseURL, clientBaseURL } from "../../../config/settings";
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
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, id, name } = props;
  const history = useHistory();
  const [teamName, setTeamName] = useState("");

  const handleClose = () => {
    onClose();
  };

  const deleteAccount = async () => {
    console.log("deleting team");
    console.log("SimpleDialog -> team name", teamName);
    if (teamName != name) {
      alert("The team names don't match. Are you getting cold feet? 🧊👣");
      setTeamName("");
      return;
    }

    const url = `${baseURL}/team/delete`;
    const body = { id: id };
    console.log("body ->", body);

    const response = await postCall(url, body);

    const data = await response.json();
    const { confirmation, message } = data;
    console.log("the response is", data);
    if (confirmation === "success") {
      alert(`Success: ${message}`);
      // window.location.href = `${clientBaseURL}/home`;
      history.push("/home");
    } else {
      alert(`Error: ${message}`);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classes.mainDiv}>
        <DialogTitle id="simple-dialog-title">
          Are you sure you want to delete this team?
        </DialogTitle>
        <List>
          <ListItem button key={"confirm-deletion"}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <SentimentDissatisfiedIcon />
              </Avatar>
            </ListItemAvatar>
            <TextField
              id="outlined-basic"
              label="Confirm Team Name"
              variant="outlined"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </ListItem>

          <ListItem autoFocus button onClick={deleteAccount}>
            <ListItemAvatar>
              <Avatar>
                <DeleteForeverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete team" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
}

export default SimpleDialog;
