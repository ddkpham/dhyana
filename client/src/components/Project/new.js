import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { baseURL, clientBaseURL } from "../../config/settings";
import { postCall, getCall } from "../../apiCalls/apiCalls";
import "./new.scss";

class NewProject extends React.Component {
  state = {
    name: "",
    description: "",
    team_options: [],
    team_id: "",
  };

  async componentDidMount() {
    this.getTeams();
  }

  create = async () => {
    const { name, description, team_id } = this.state;
    const { history } = this.props;
    const url = `${baseURL}/project/create`;
    const body = { name, description, team_id };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("project create success", data);
        if (data.confirmation === "success" && data.data) {
          // window.location.href = `${clientBaseURL}/project/${data.data.name}`;
          history.push(`/project/${data.data.name}`);
        } else {
          console.log("project create error", data.message);
          alert(
            "Project was not created. Error: missing project name or team."
          );
        }
      })
      .catch((err) => console.log("project create error", err));
  };

  getTeams = () => {
    const url = `${baseURL}/team/all`;
    getCall(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ team_options: data.data });
      })
      .catch((err) => console.log("team fetch error", err));
  };

  onChangeProjectName = (e) => {
    const input = e.target.value;
    const regex = /^[\w\-\s]+$/;
    if (regex.test(input) || input == "") {
      this.setState({ name: input });
    }
  };

  render() {
    const { name, description, team_id, team_options } = this.state;
    return (
      <div id="main-project-div">
        <Card className="create-project-wrapper">
          <div className="page-title">
            <Typography variant="h4" color="secondary">
              Create New Project
            </Typography>
          </div>
          <div className="main-content-div">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              inputProps={{ maxLength: 255 }}
              onChange={this.onChangeProjectName}
            />
            <TextField
              label="Description"
              variant="outlined"
              inputProps={{ maxLength: 1023 }}
              value={description}
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
            />
            <FormControl>
              <InputLabel
                className="select-label"
                htmlFor="team_id"
                id="team-select-label"
              >
                Team
              </InputLabel>
              <Select
                labelId="team-select-label"
                variant="outlined"
                value={team_id}
                onChange={(event) => {
                  this.setState({ team_id: event.target.value });
                }}
              >
                {team_options.map((t) => {
                  return <MenuItem value={t.id}>{t.name}</MenuItem>;
                })}
                <MenuItem value="">None</MenuItem>
              </Select>
            </FormControl>
            <div className="create-project-button">
              <Button
                className="create-btn"
                onClick={this.create}
                variant="outlined"
                color="primary"
              >
                Create
              </Button>
            </div>
            {/* </FormControl> */}
          </div>
        </Card>
      </div>
    );
  }
}

export default NewProject;
