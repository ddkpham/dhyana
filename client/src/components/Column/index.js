import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DragTarget from './DragTarget';
import Task from '../Task';
import { baseURL } from "../../config/settings";

class Column extends React.Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        const { column } = this.props
        const url = `${baseURL}/project/tasks`;
        const body = {task_ids: column.tasks};
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            console.log('fetch tasks success', data)
            this.setState({ tasks: data.data })
        })
        .catch(err => console.log("task fetch error", err));
    };

    render(){
        const { column } = this.props;
        const { tasks } = this.state;

        return (
            <Grid item key={column.id}>
                <DragTarget columnName={column.name}>
                    <Paper>
                        <Typography>{column.name}</Typography>
                        {tasks.map((t) =>
                            <Task task={t} key={t.name}/>
                        )}
                    </Paper>
                </DragTarget>
            </Grid>
        );
    }
}

export default Column;
