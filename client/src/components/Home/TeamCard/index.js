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
import UserAvatar from "./avatar";
import "./index.scss";
import { team_images } from "../../../static/teams/teamImages";

const styles = (theme) => ({
  teamCardContainer: {
    overflowX: "scroll",
    justifyContent: "right",
  },
  mainCard: {
    display: "flex",
    flexDirection: "column",
    width: 335,
    height: 160,
  },
  mainCardDiv: {
    width: "100%",
  },
  contentDiv: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  contentTextDiv: {
    width: 235,
    padding: 10,
    overflowX: "scroll",
  }
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
      <Card raised
        onClick={() => {
          window.location.href = `${clientBaseURL}/team/${name}`;
        }}
        className={ classes.mainCard }
      >
        
          <CardContent className="teamcard-container">
            <div className={ classes.teamCardContainer }>
              <div className="team-card-content">
                <CardActionArea>
                <div className={classes.contentDiv}>
                  <img
                    className="teamcard-card-media"
                    src={team_images[imgIndex]}
                    title="Live from space album cover"
                    style={{width: 100, height: 100}}
                  />
                  <div className={classes.contentTextDiv}>
                    <Typography noWrap gutterBottom variant="h5" color="primary">
                      {name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      projects: {info.projects ? info.projects.length : null}
                    </Typography>
                  </div>
                </div>
                  
                </CardActionArea>
                <div className="teamcard-members-wrapper">
                  {users.map((user) => (
                    <UserAvatar user={user}/>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TeamCard);
