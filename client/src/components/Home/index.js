import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { baseURL } from "../../config/settings";
import ContactLink from "../ContactLink";
import ProjectCard from "../Project/card";

class Home extends React.Component {
  state = {
    contacts: [],
    projects: [],
  };
  async componentDidMount() {
    this.getUsers();
    this.getProjects();
  }

  getUsers = async () => {
    const url = `${baseURL}/contacts`;
    const response = await fetch(url);
    const data = await response.json();
    const { data: contacts } = data;
    this.setState({ contacts });
  };

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
    const { contacts, projects } = this.state;
    console.log("Home -> render -> contacts", contacts);
    const contactInfo = contacts.map((contact) => {
      const { first_name, last_name } = contact;
      return { first_name, last_name };
    });

    console.log("Home -> render -> contacts", contactInfo);
    return (
      <div>
        <h2>Home</h2>
        {contactInfo.map((contact) => (
          <ContactLink
            first_name={contact.first_name}
            last_name={contact.last_name}
          />
        ))}
        <Typography variant="h4">Projects</Typography>
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
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
