import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Board extends React.Component {
    state = {
        board: {},
    }
    ;
    async componentDidMount() {
        const { id } = this.props
        this.getBoard(id);
    }

    getBoard = async (id) => {
        // TODO: fetch actual board based on id
        const fakeBoard = { name: "Test", description: "For Testing", columns: [{ name: "todo", id: 1 }, { name: "doing", id: 2 }]}
        this.setState({ board: fakeBoard });
    };
    render(){
        const { board } = this.state;
        return (
            <div>
                <Typography variant="h5" color="textSecondary" gutterBottom>{board.name}</Typography>
                <Typography variant="body1" gutterBottom>{board.description}</Typography>
                <Grid container>
                    {board.columns && board.columns.map((c) =>
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

export default Board;
