import React from "react";
import { baseURL } from "../../config/settings";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      info: [],
      editMode: false,
    };
  }

  async componentDidMount() {
    const { first_name, last_name } = this.props;
    console.log("Contact -> componentDidMount -> this.props", this.props);
    this.getInfo(first_name, last_name);
  }

  getInfo = async (first_name, last_name) => {
    const url = `${baseURL}/contacts/${first_name}/${last_name}`;
    const response = await fetch(url);
    console.log("Contact -> getInfo -> url", url);

    const res = await response.json();
    const { data } = res;
    console.log("Contact -> getInfo -> data", data);

    this.setState({ info: data });
  };

  update = async () => {
    const { fn, ln, pn, em, nt } = this.state;
    const {
      first_name,
      last_name,
      notes,
      email,
      phone_number,
    } = this.state.info[0];
    const url = `${baseURL}/contacts/update`;
    const body = {
      first_name: fn ? fn : first_name,
      last_name: ln ? ln : last_name,
      phone_number: pn ? pn : phone_number,
      email: em ? em : email,
      notes: nt ? nt : notes,
    };
    console.log("login -> body", body);
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const { confirmation } = data;
    if (confirmation === "success") {
      // window.location.href = `${clientBaseURL}/home`;
    }
  };

  render() {
    console.log("contact", this.props);
    const {
      info,
      editMode,
      first_name: fn,
      last_name: ln,
      notes: nt,
      email: em,
      phone_number: pn,
    } = this.state;
    let data;
    let display;
    if (info.length > 0) {
      data = info[0];
      const { first_name, last_name, notes, email, phone_number } = data;
      display = (
        <div>
          <div className="text-input">
            <TextField
              label="first name"
              variant="outlined"
              value={editMode ? fn : first_name}
              disabled={!editMode}
              onChange={(event) => {
                this.setState({ first_name: event.target.value });
              }}
            />
            <TextField
              label="last name"
              variant="outlined"
              value={editMode ? ln : last_name}
              disabled={!editMode}
              onChange={(event) => {
                this.setState({ last_name: event.target.value });
              }}
            />
            <TextField
              label="email"
              variant="outlined"
              value={editMode ? em : email}
              disabled={!editMode}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
            <TextField
              label="phone number"
              variant="outlined"
              value={editMode ? pn : phone_number}
              disabled={!editMode}
              onChange={(event) => {
                this.setState({ phone_number: event.target.value });
              }}
            />
            <TextField
              label="notes"
              variant="outlined"
              value={editMode ? nt : notes}
              disabled={!editMode}
              multiline
              onChange={(event) => {
                console.log("bnotes", event.target.value);
                this.setState({ notes: event.target.value });
              }}
            />
          </div>
          <Button
            onClick={() =>
              this.setState((prevState) => {
                return {
                  ...prevState,
                  editMode: !prevState.editMode,
                };
              })
            }
          >
            {!editMode ? "Edit Contact" : "View Contact"}
          </Button>
          {editMode ? <Button onClick={this.update}>Update</Button> : null}
        </div>
      );
    }
    console.log("Contact -> render -> data", data);

    return (
      <div>
        <h2>Contact</h2>
        {display}
      </div>
    );
  }
}

export default Contact;
