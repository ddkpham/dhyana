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
        const { column } = this.props
        this.getTasks(column.id);
    }

    getTasks = (id) => {
        const fakeTasks = [
            {name: "task 1", description: "for testing"},
            {name: "task 2", description: ""},
            {name: "task 3", description: "I have descriiption"},
            {name: "task 4", description: "be the best"}
        ];
        this.setState({tasks: fakeTasks});

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
