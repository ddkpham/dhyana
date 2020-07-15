import React from "react";
import { baseURL, clientBaseURL } from "../../config/settings";
import ContactLink from "../ContactLink";
import Contact from "../Contact";
class Home extends React.Component {
  state = {
    contacts: [],
  };
  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const url = `${baseURL}/contacts`;
    const response = await fetch(url);
    const data = await response.json();
    const { data: contacts } = data;
    this.setState({ contacts });
  };
  render() {
    const { contacts } = this.state;
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
      </div>
    );
  }
}

export default Home;
