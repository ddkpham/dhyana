import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import { baseURL } from "../../config/settings";

class AddColumnDialog extends React.Component {
    state = {
        name: "",
    };

    create = () => {
        const { close, projectId, order } = this.props;
        const { name } = this.state;
        const url = `${baseURL}/project/column`;
        const body = { columnName: name, projectId, columnOrder: order };

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
        console.log("column create success", data)
        if(data.confirmation === 'success' && data.data){
            close();
            this.setState({name: ""});
        } else {
            console.log("project create error", data.message);
        }
        }).catch(err => console.log("project create error", err));
    };

    render() {
        const { name } = this.state;
        const { isOpen, close } = this.props;
        return (
            <Dialog open={isOpen} onClose={close}>
                <div>
                    <Typography variant='h4' color="textSecondary">Create New Column</Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => {
                            this.setState({ name: event.target.value });
                        }}
                    />
                    <Button onClick={this.create}>Add</Button>
                </div>
            </Dialog>
        );
        }
    }

export default AddColumnDialog;
