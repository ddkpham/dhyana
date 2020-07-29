import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { baseURL, clientBaseURL } from "../../config/settings";
import { postCall, getCall } from "../../apiCalls/apiCalls";

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
    const url = `${baseURL}/project/create`;
    const body = { name, description, team_id };
    postCall(url, body)
      .then((response) => response.json())
      .then((data) => {
        console.log("project create success", data);
        if (data.confirmation === "success" && data.data) {
          window.location.href = `${clientBaseURL}/project/${data.data.name}`;
        } else {
          console.log("project create error", data.message);
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

  render() {
    const { name, description, team_id, team_options } = this.state;
    return (
      <div>
        <Typography variant="h4">Create New Project</Typography>
        <div className="text-input">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
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
              variant="outlined"
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
          <Button onClick={this.create} variant="outlined" color="secondary">
            Create
          </Button>
        </div>
      </div>
    );
  }
}

export default NewProject;
