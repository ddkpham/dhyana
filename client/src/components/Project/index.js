import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Project extends React.Component {
    state = {
        project: {},
    }
    ;
    async componentDidMount() {
        const { id } = this.props
        this.getProject(id);
    }

    getProject = async (id) => {
        // TODO: fetch actual project based on id
        const fakeProject = { name: "Test", description: "For Testing", columns: [{ name: "todo", id: 1 }, { name: "doing", id: 2 }]}
        this.setState({ project: fakeProject });
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
