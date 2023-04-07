import React from "react";
import { useState } from "react";
import "./DeviceSearchBar.css";
import { Button, Grid } from "@mui/material";

const DeviceSearchBar = () => {
  const suggestionsList = [
      "Aaryan",
      "Dr.Li",
      "Suprabhat",
      "Rachel",
      "Breathe DC",
      "Sensors",
    ];
  const [suggestions, setSuggestions] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });
  const [status, setStatus] = useState("Unknown")
  const handleCheckStatus = () => {

    const options = ["Active", "Inactive"]
    const choice = Math.floor(Math.random()*2)
    setStatus(options[choice])
  }
  const handleChange = (event) => {
    
    const userInput = event.currentTarget.value;

    const filteredSuggestions = suggestionsList.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setSuggestions({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value,
    });
  };
  const handleListClick = (item) => {
    setSuggestions({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: item,
    });
  };
  return (
    <Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={5} >
      <Grid item>
<h1>Status: {status}</h1>

      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item>
            <div className="search-box">
              <div className="row">
                <input
                  type="text"
                  id="input-box"
                  placeholder="Search anything"
                  autoComplete="off"
                  onChange={handleChange}
                  value={suggestions.userInput}
                />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>

              <div className="result-box">
                {suggestions.showSuggestions ? (
                  <ul>
                    {suggestions.filteredSuggestions.map((item, index) => (
                      <li
                        key={item + index.toString()}
                        onClick={() => handleListClick(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Grid>

          <Grid item>
            <Button style={{ height: "70px" }} variant="contained" onClick={handleCheckStatus} disabled={!suggestionsList.includes(suggestions.userInput)}>
              Check Status!
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DeviceSearchBar;
