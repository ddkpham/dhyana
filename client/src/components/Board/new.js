import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { baseURL } from "../../config/settings";

class NewBoard extends React.Component {
    state = {
        name: "",
        description: ""
    };

    create = async () => {
        const { name, description } = this.state;
        const url = `${baseURL}/board/new`;
        const body = { name, description };
        // TODO: call create api
    };

    render() {
        const { name, description } = this.props;
        return (
            <div>
            <Typography variant='h4'>Create New Board</Typography>
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
                label="description"
                variant="outlined"
                value={description}
                onChange={(event) => {
                    this.setState({ description: event.target.value });
                }}
                />
            </div>
            <Button onClick={this.create}>Create</Button>
            </div>
        );
        }
    }

export default NewBoard;
