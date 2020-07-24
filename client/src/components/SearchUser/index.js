import { baseURL, clientBaseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { Link } from "react-router-dom";
import UserCard from "./userCard";

function SearchUser() {
  const [contactList, setContacts] = useState([]);
  const [input, setInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [firstIndexPresented, setFirstIndexPresented] = useState(0);
  const numResultsToShow = 5;

  const search = async (props) => {
    const url = `${baseURL}/user/search/result`;
    const searchString = { input };
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchString),
    });

    const payload = await response.json();
    const { confirmation: confirmation, data: contacts } = payload;
    console.log(contacts);
    setHasSearched(true);
    setFirstIndexPresented(0);
    if (response.status == 200) {
      setContacts(contacts);
    }
  };

  useEffect(() => {
    if (input.length) {
      search();
    }
  }, [input]);

  const searchResults = () => {
    if (hasSearched && contactList.length > 0) {
      var results = [];
      const ceiling = Math.min(
        firstIndexPresented + numResultsToShow,
        contactList.length
      );
      for (var i = firstIndexPresented; i < ceiling; i++) {
        results.push(<UserCard user={contactList[i]} key={i} />);
      }
      return <ul>{results}</ul>;
    } else if (hasSearched && contactList.length == 0) {
      return <h4>Sorry, no results match your search</h4>;
    } else {
      return null;
    }
  };

  const nextButton = () => {
    if (contactList.length > firstIndexPresented + numResultsToShow) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            setFirstIndexPresented(firstIndexPresented + numResultsToShow)
          }
        >
          Next
        </Button>
      );
    } else {
      return null;
    }
  };

  const prevButton = () => {
    if (firstIndexPresented > 0 && contactList.length > 0) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            setFirstIndexPresented(firstIndexPresented - numResultsToShow)
          }
        >
          Previous
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <div id="mainDiv">
      <div className="column">
        <h2 className="title">Search User</h2>
        <div className="text-input">
          <TextField
            variant="outlined"
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="column">
        <h2 className="title">Results</h2>
        {prevButton()}
        {nextButton()}
        {searchResults()}
      </div>
    </div>
  );
}

export default SearchUser;
