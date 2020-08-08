import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { useHistory } from "react-router-dom";
import UserCard from "./userCard";
import { postCall } from "../../apiCalls/apiCalls";

function SearchUser() {
  const [contactList, setContacts] = useState([]);
  const [input, setInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [firstIndexPresented, setFirstIndexPresented] = useState(0);
  const numResultsToShow = 5;
  let history = useHistory();

  useEffect(() => {
    async function search(props) {
      const url = `${baseURL}/user/search/result`;
      const searchString = { input };
      const response = await postCall(url, searchString);

      const payload = await response.json();
      const { data: contacts } = payload;
      console.log(contacts);
      setHasSearched(true);
      setFirstIndexPresented(0);
      if (response.status === 200) {
        setContacts(contacts);
      }
    }
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
    } else if (hasSearched && contactList.length === 0) {
      return <h4>Sorry, no results match your search</h4>;
    } else {
      return null;
    }
  };

  const nextButton = () => {
    if (contactList.length > firstIndexPresented + numResultsToShow) {
      return (
        <Button
          className="search-user-button"
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
          className="search-user-button"
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
    <div>
      <div className="buttonDiv">
        <Button
          className="backButton"
          variant="outlined"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </div>
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
    </div>
  );
}

export default SearchUser;
