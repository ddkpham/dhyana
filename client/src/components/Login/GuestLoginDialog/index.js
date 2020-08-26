import React from "react";
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
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  body: {
    margin: "10px",
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, login, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" className={classes.title}>
        <Typography variant="h4" color="primary">
          Login with shared guest account
        </Typography>
      </DialogTitle>
      <Typography variant="body1" className={classes.body}>
        This is a shared profile. Every guest user will have access to this
        information. If you require a more secure profile, please create your
        own account. We cannot control the behaviour of everyone on this
        account... 😅
      </Typography>
      <div className="guest-login-button-container">
        <Button
          variant="outlined"
          color="primary"
          className={"guest-login-button"}
          onClick={login}
        >
          Login
        </Button>
      </div>
    </Dialog>
  );
}
