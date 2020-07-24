import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { baseURL, clientBaseURL } from "../../config/settings";
import ProjectCard from "../Project/card";

class Home extends React.Component {
  state = {
    projects: [],
  };
  async componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    const url = `${baseURL}/project/all`;
    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      console.log("projects", data)
      this.setState({ projects: data.data })
    })
    .catch(err => console.log("project fetch error", err));
};

  render() {
    const { projects } = this.state;

    return (
      <div>
        <Typography variant="h4">Projects</Typography>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
        <Card raised>
          <CardActionArea href={"/project/new"}>
            <CardContent>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                <AddIcon/>
                Add Project
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default Home;
