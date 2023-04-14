import React, { useEffect } from "react";
import { useState } from "react";
import "./DeviceSearchBar.css";
import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";

const DeviceSearchBar = () => {
  const suggestionsList = [
    "Aaryan",
    "Dr.Li",
    "Suprabhat",
    "Rachel",
    "Breathe DC",
    "Sensors",
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [suggestionList, setSuggestionsList] = useState({});

  useEffect(
    () =>
      async function getDeviceMap() {
        setIsLoading(true);

        const res = await axios.get(
          "http://localhost:5000/airQuality/getDeviceID"
        );

        setSuggestionsList(res.data);
        setIsLoading(false);
      },
    []
  );

  const [suggestions, setSuggestions] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });
  const [status, setStatus] = useState("UNKNOWN");
  const handleCheckStatus = async () => {

    setIsLoading(true)
    const res = await axios.get(
      "http://localhost:5000/general/getDeviceStatus",
      { params: { deviceID: suggestionList[suggestions.userInput] } }
    );
    setStatus(res.data.toUpperCase());
    setIsLoading(false)
  };
  const handleChange = (event) => {
    const userInput = event.currentTarget.value;

    const filteredSuggestions = Object.keys(suggestionList).filter(
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
    if (!Object.keys(suggestionList).includes(suggestions.userInput)) {
      setStatus("UNKNOWN");
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      spacing={5}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid item>
            <h1>
              Status:{" "}
              {Object.keys(suggestionList).includes(suggestions.userInput)
                ? status
                : "UNKNOWN"}
            </h1>
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
                      placeholder="Enter Device Name"
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
                <Button
                  disableElevation
                  style={{ height: "70px" }}
                  variant="contained"
                  onClick={handleCheckStatus}
                  disabled={
                    !Object.keys(suggestionList).includes(suggestions.userInput)
                  }
                >
                  Check Status!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DeviceSearchBar;
