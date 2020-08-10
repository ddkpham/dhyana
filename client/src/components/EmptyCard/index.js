import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import empty from "../../static/such_empty.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: "30vw",
    height: "40vh",
  },
});

function EmptyCard(props) {
  console.log("EmptyCard -> props", props);
  const classes = useStyles();

  return (
    <Card raised className="empty-card-container">
      <CardMedia
        className={classes.media}
        image={empty}
        title="Contemplative Reptile"
      />
    </Card>
  );
}

export default EmptyCard;
