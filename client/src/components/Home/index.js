import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { baseURL, clientBaseURL } from "../../config/settings";
import ContactLink from "../ContactLink";
import Contact from "../Contact";
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

  getProjects = async () => {
    const fakeProjects = [{id: 1, name: "Test Project", description: "Toria testing", cards: [], owner: 'org/123123'}];
    this.setState({ projects: fakeProjects });
  }

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
          <ProjectCard project={p} />
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
