import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { baseURL, clientBaseURL } from "../../../config/settings";
import { withStyles } from "@material-ui/core/styles";
import { getCall } from "../../../apiCalls/apiCalls";
import Avatar from "@material-ui/core/Avatar";
import "./index.scss";
import { team_images } from "../../../static/teams/teamImages";

const styles = (theme) => ({
  teamCardContainer: {
    overflowX: "scroll",
  },
});

class TeamCard extends React.Component {
  state = {
    info: {},
    users: [],
  };

  async componentDidMount() {
    this.getTeamInfo();
  }

  getTeamInfo = () => {
    const { name, id } = this.props;
    var url = `${baseURL}/team/${name}`;
    console.log("TeamCard -> getTeamInfo -> name, id", name, id);
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("team info", data);
        this.setState({ info: data.data });
      })
      .catch((err) => console.log("project fetch error", err));

    url = `${baseURL}/team/${id}/users`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("user info", data);
        this.setState({ users: data.data });
      })
      .catch((err) => console.log("project fetch error", err));
  };

  navigateToUserPage = (username) => {
    console.log("TeamCard -> navigateToUserPage -> username", username);
    window.location.href = `${clientBaseURL}/user/${username}`;
  };

  render() {
    const { name, classes } = this.props;
    const { info, users } = this.state;
    const imgIndex = Math.floor(Math.random() * team_images.length);

    return (
      <Card raised>
        <CardContent className="teamcard-container">
          <CardMedia
            className="teamcard-card-media"
            image={team_images[imgIndex]}
            title="Live from space album cover"
            onClick={() => {
              window.location.href = `${clientBaseURL}/#`;
            }}
          />
          <div className={ classes.teamCardContainer }>
          <div className="team-card-content">
            <CardActionArea href={"#"}>
              <Typography variant="h5" color="primary">
                {name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                projects: {info.projects ? info.projects.length : null}
              </Typography>
              <Typography variant="body2">members</Typography>
            </CardActionArea>
            <div className="teamcard-members-wrapper">
              {users.map((user) => {
                const { first_name, last_name, username } = user;
                if (first_name && last_name) {
                  return (
                    <IconButton
                      onClick={() => this.navigateToUserPage(username)}
                    >
                      <Avatar>
                        {first_name.charAt(0)}
                        {last_name.charAt(0)}
                      </Avatar>
                    </IconButton>
                  );
                } else {
                  return (
                    <IconButton
                      onClick={() => this.navigateToUserPage(username)}
                    >
                      <Avatar>
                        {username.charAt(0)}
                        {username.charAt(1)}
                      </Avatar>
                    </IconButton>
                  );
                }
              })}
            </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TeamCard);
