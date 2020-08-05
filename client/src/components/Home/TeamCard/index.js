import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { baseURL } from "../../../config/settings";
import { getCall } from "../../../apiCalls/apiCalls";
import Avatar from "@material-ui/core/Avatar";
import "./index.scss";

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
    window.location.href = `${baseURL}/user/${username}`;
  };

  render() {
    const { name, id } = this.props;
    const { info, users } = this.state;
    return (
      <Card raised>
        <CardContent>
          <CardActionArea href={"#"}>
            <Typography variant="h5" color="textPrimary" gutterBottom>
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
                  <IconButton onClick={() => this.navigateToUserPage(username)}>
                    <Avatar>
                      {first_name.charAt(0)}
                      {last_name.charAt(0)}
                    </Avatar>
                  </IconButton>
                );
              } else {
                return (
                  <IconButton onClick={() => this.navigateToUserPage(username)}>
                    <Avatar>
                      {username.charAt(0)}
                      {username.charAt(1)}
                    </Avatar>
                  </IconButton>
                );
              }
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default TeamCard;
