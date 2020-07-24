import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { Link } from "react-router-dom";
import UserCard from "./userCard";


// for (var contact = 0; contact<contactList.length; contact++) {
//   <li>
//     {contact.first_name} {contact.last_name}
//   </li>
// }

function SearchUser() {
  const [contactList, setContacts] = useState("");
  const [input, setInput] = useState("");

  const search = async (props) => {
    const url = `${baseURL}/user/search/result`;
    const body = { input };
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const { confirmation: confirmation, data: contacts } = data;
    alert(confirmation)
    alert(JSON.stringify(contacts))
    if (confirmation == "success") {
      setContacts({ contacts });
    }
  };

  return (
    <div id="mainDiv">
      <div class="column">
        <h2>Search User</h2>
        <div className="text-input">
          <TextField
            variant="outlined"
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </div>
        <div>
          <Button variant="outlined" color="primary" onClick={search}>
            Search
          </Button>
        </div>
      </div>
      <div class="column">
      </div>
    </div>
  );
}

export default SearchUser;
