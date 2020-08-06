import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./card.scss";

function ProjectCard(props) {
  const {
    project: { name, description },
    team,
  } = props;
  return (
    <Card raised className="project-card-container">
      <CardActionArea href={"/project/" + name}>
        <CardContent>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="body2">{team}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
