import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { baseURL } from "../../config/settings";
class Project extends React.Component {
    state = {
        project: {},
    };

    async componentDidMount() {
        const { name } = this.props
        this.getProject(name);
    }

    getProject = (name) => {
        const url = `${baseURL}/project/${name}`;
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {this.setState({ project: data.data[0] })
        })
        .catch(err => console.log("team fetch error", err));
    };

    render(){
        const { project } = this.state;

        return (
            <div>
                <Typography variant="h5" color="textSecondary" gutterBottom>{project.name}</Typography>
                <Typography variant="body1" gutterBottom>{project.description}</Typography>
                <Grid container>
                    {project.columns && project.columns.map((c) =>
                        <Grid item xs={6} key={c.id}>
                            <Paper>
                                <Typography>{c.name}</Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default Project;
