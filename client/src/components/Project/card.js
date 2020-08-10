import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import motion_img from "../../static/motion.jpg";
import elephant_img from "../../static/elephant.jpg";
import construction_img from "../../static/construction.jpg";
import bomb_img from "../../static/bomb.jpg";
import waterfall_img from "../../static/waterfall.jpg";
import wolves_img from "../../static/wolves.jpg";
import cub_img from "../../static/cub.jpg";
import { useHistory } from "react-router-dom";

import "./card.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 335,
  },
  media: {
    height: 140,
    cursor: "pointer",
  },
  contentDiv: {
    maxWidth: 325,
  }
});

function ProjectCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const images = [
    motion_img,
    elephant_img,
    construction_img,
    bomb_img,
    waterfall_img,
    wolves_img,
    cub_img,
  ];
  const imgIndex = Math.floor(Math.random() * images.length);

  const {
    project: { name, description },
    team,
  } = props;
  return (
    <Card raised className="project-card-container">
      <CardMedia
        className={classes.media}
        image={images[imgIndex]}
        title="Contemplative Reptile"
        onClick={() => history.push("/project/" + name)}
      />
      <CardActionArea href={"/project/" + name}>
        <CardContent>
          <div className={classes.contentDiv}>
            <Typography variant="h5" color="primary" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {description}
            </Typography>
            <Typography variant="body2">{team}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
