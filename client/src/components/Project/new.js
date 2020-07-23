import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { baseURL } from "../../config/settings";

class NewProject extends React.Component {
    state = {
        name: "",
        description: "",
        team_options: [],
        team_id: ""
    };

    async componentDidMount() {
        this.getTeams();
    }

    create = async () => {
        const { name, description, team } = this.state;
        const url = `${baseURL}/project/new`;
        const body = { name, description, team_id: team.id };
        // TODO: call create api
    };

    getTeams = () => {
        const url = `${baseURL}/team/all`;
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {this.setState({ team_options: data.data })
        })
        .catch(err => console.log("fetch error", err));
    };

    render() {
        const { name, description, team_id, team_options } = this.state;
        return (
            <div>
            <Typography variant='h4'>Create New Project</Typography>
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
                    <InputLabel id="demo-simple-select-label">Team</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={team_id}
                        onChange={(event) => {
                            this.setState({ team_id: event.target.value });
                        }}
                    >
                        {team_options.map((t) => {
                            return <MenuItem value={t.id}>{t.name}</MenuItem>
                        })}
                        <MenuItem value="">None</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button onClick={this.create}>Create</Button>
            </div>
        );
        }
    }

export default NewProject;
