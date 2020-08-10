import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import empty from "../../static/such_empty.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 140,
  },
  media: {
    height: 140,
    width: "25vw",
  },
  mainDiv: {
    padding: 15,
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  titlePrompt: {
    paddingTop: 15,
  }
});

function EmptyCard(props) {
  console.log("EmptyCard -> props", props);
  const classes = useStyles();

  return (
    <Card raised className="empty-card-container">
      <div className={classes.mainDiv}>
        <CardMedia
          className={classes.media}
          image={empty}
          title="Contemplative Reptile"
        />
        <div>
          <Typography className={classes.titlePrompt}>You must be part of a team to make a project.</Typography>
        </div>
      </div>
    </Card>
  );
}

export default EmptyCard;
