import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Popover from "@material-ui/core/Popover";
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { baseURL } from "../../config/settings";
import { getCall } from "../../apiCalls/apiCalls";

const styles = (theme) => ({
    popover: {
        padding: "10px"
    },
});

class ProjectToggle extends React.Component {
    state = {
        anchorEl: null,
        projects: [],
        loading: false
    };

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget, loading: true});
        const url = `${baseURL}/project/all`;
        getCall(url)
        .then((response) => response.json())
        .then((payload) => this.setState({loading: false, projects: payload.data}))
        .catch((err) => {
            console.log("project fetch error", err)
            this.setState({loading: false})
        });
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render(){
        const { anchorEl, loading, projects } = this.state;
        const { classes } = this.props;
        const open = Boolean(anchorEl);
        const buttonIcon = open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>;

        return (
            <div>
                <Button endIcon={buttonIcon} variant="contained" color="primary" onClick={this.handleClick}>
                    Switch Projects
                </Button>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    classes={{paper: classes.popover}}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                >
                    <Typography variant='h6'>Projects:</Typography>
                    {loading && <CircularProgress/>}
                    {!loading && !projects.length && <Typography>No Projects Found</Typography>}
                    <List>
                        {projects.map((p) => (
                            <ListItem key={p.id} button component={Link} href={"/project/" + p.name}>
                                <Typography>{p.name}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(ProjectToggle);