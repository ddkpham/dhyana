import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { clientBaseURL, baseURL } from "../../config/settings";

import "./index.scss";
import { render } from "react-dom";
class NewContact extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    notes: "",
  };

  create = async () => {
    const { first_name, last_name, phone_number, email, notes } = this.state;
    const url = `${baseURL}/contacts/new`;
    const body = { first_name, last_name, phone_number, email, notes };
    console.log("login -> body", body);
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const { confirmation } = data;
    if (confirmation == "success") {
      window.location.href = `${clientBaseURL}/home`;
    }
  };
  render() {
    const { first_name, last_name, phone_number, email, notes } = this.props;
    return (
      <div>
        <h1>New Contact Info</h1>
        <div className="text-input">
          <TextField
            label="first name"
            variant="outlined"
            value={first_name}
            onChange={(event) => {
              console.log("first_name", event.target.value);
              this.setState({ first_name: event.target.value });
            }}
          />
          <TextField
            label="last name"
            variant="outlined"
            value={last_name}
            onChange={(event) => {
              this.setState({ last_name: event.target.value });
            }}
          />
          <TextField
            label="email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
          <TextField
            label="phone number"
            variant="outlined"
            value={phone_number}
            onChange={(event) => {
              this.setState({ phone_number: event.target.value });
            }}
          />
          <TextField
            label="notes"
            variant="outlined"
            value={notes}
            multiline
            onChange={(event) => {
              this.setState({ notes: event.target.value });
            }}
          />
        </div>
        <Button onClick={this.create}>Create</Button>
      </div>
    );
  }
}

export default NewContact;
