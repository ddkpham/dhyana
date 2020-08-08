import { baseURL } from "../../config/settings";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import UserCard from "./userCard";
import { postCall } from "../../apiCalls/apiCalls";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  mainDiv: {
    
  },
  searchField: {
    width: 250,
    mx: "auto",
  },
  searchDiv: {
    display: "flex",
    justifyContent: "center",
  },
  searchGrid: {
    padding: 15,
    display: "table",
    alignItems: "center",
    width: "65%",
    // border: "1px solid grey",
    // borderRadius: 4,
  },
  searchCardDiv: {
    display: "flex",
    justifyContent: "center",
  },
  searchCard: {
    display: "table-row",
    float: "left",
    width: "100%",
    textAlign: "center",
    paddingTop: 10,
  },
  resultsDiv: {
    display: "table-row",
    width: "100%",
    textAlign: "center",
  },
  userCard: {
    width: "100%",
  },
  resultsTable: {
    wdith: "100%",
    // display: "flex",
    justifyContent: "space-between",
    margin: 15,
    // paddingTop: 20,
    // paddingBottom: 20,
    // height: 200,
  },
  buttonDiv: {
    marginBottom: 50,
  },
  buttonPrev: {
    marginRight: 5,
  }
}));


function SearchUser() {
  const classes = useStyles();

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
      setContacts(contacts);
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
        results.push(<UserCard className={classes.userCard} user={contactList[i]} key={i} />);
      }
      return results
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
          // className={classes.buttonNextPrev}
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
          className={classes.buttonPrev}
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
    <div className={classes.mainDiv}>
      <div className={classes.buttonDiv}>
        <Button
          className="backButton"
          variant="outlined"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </div>
      <div className={classes.searchDiv}>
        <Grid container className={classes.searchGrid}>
          <div className={classes.searchCardDiv}>
          <Card elevation={4} className={classes.searchCard}>
            <Typography variant="h4" className={classes.title}>Search User</Typography>
            <TextField
              className={classes.searchField}
              variant="outlined"
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </Card>
          </div>

          <div className={classes.resultsDiv}>
              {prevButton()}
              {nextButton()}
              <div className={classes.resultsTable}>
                {searchResults()}
              </div>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default SearchUser;
