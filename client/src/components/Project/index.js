import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Column from '../Column';
import AddColumnModal from '../Column/addModal';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { baseURL } from "../../config/settings";
class Project extends React.Component {
    state = {
        project: {},
        columns: [],
        columnModalOpen: false
    };

    async componentDidMount() {
        const { name } = this.props
        this.getProject(name);
    }

    getProject = (name) => {
        const url = `${baseURL}/project/${name}`;
        console.log('get project', name)
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        })
        .then(response => {console.log('in first promise'); return response.json()})
        .then(data => {
            console.log('fetch project success', data)
            const project = data.data[0];
            this.setState({ project });
            this.getColumns(project.id);
        })
        .catch(err => console.log("project fetch error", err));
    };

    getColumns = (projectId) => {
        const url = `${baseURL}/project/${projectId}/columns`;
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            console.log('fetch columns success', data)
            this.setState({ columns: data.data })
        })
        .catch(err => console.log("column fetch error", err));
    };

    closeColumnModal = () => {
        const { project } = this.state;
        this.setState({ columnModalOpen: false });
        this.getColumns(project.id);
    }

    openColumnModal = () => {
        this.setState({ columnModalOpen: true });
    }

    render(){
        const { project, columns, columnModalOpen } = this.state;
        console.log("columns", columns)
        return (
            <div>
                <DndProvider backend={HTML5Backend}>
                    <AddColumnModal isOpen={columnModalOpen} close={this.closeColumnModal} projectId={project?.id} order={columns.length || 0} />
                    <Typography variant="h5" color="textSecondary" gutterBottom>{project.name}</Typography>
                    <Typography variant="body1" gutterBottom>{project.description}</Typography>
                    <Button
                        startIcon={<AddIcon />} onClick={this.openColumnModal}>Add Column</Button>
                    <Grid container>
                        {columns.map((c) =>
                            <Column column={c} key={c.id} projectId={project?.id}/>
                        )}
                    </Grid>
                </DndProvider>
            </div>
        );
    }
}

export default Project;
