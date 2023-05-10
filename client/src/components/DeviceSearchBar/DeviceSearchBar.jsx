import React, { useEffect } from "react";
import { useState } from "react";
import "./DeviceSearchBar.css";
import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";

const DeviceSearchBar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [suggestionList, setSuggestionsList] = useState({});

  const [airQualityData, setAirQualityData] = useState({});

  const [status, setStatus] = useState("UNKNOWN");

  const [suggestions, setSuggestions] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });


  // Load the device_name:device_id map on init
  useEffect(
    () => {
      setIsLoading(true);
      fetch("https://iaq.hucs.ml/airQuality/getDeviceID")
        .then((res) => res.json())
        .then((data) => setSuggestionsList(data));
      setIsLoading(false);
    },
    []
  );


  // get device status and air quality data when the button is pressed
  const handleCheckStatus = async () => {
    setIsLoading(true);
    fetch(
      "https://iaq.hucs.ml/general/getDeviceStatus?" +
      new URLSearchParams({
        deviceID: suggestionList[suggestions.userInput],
      })
    )
      .then((res) => res.json())
      .then((data) => setStatus(data.status.toUpperCase()));
    fetch("https://iaq.hucs.ml/airQuality/getAirQualityData?" +
      new URLSearchParams({
        deviceID: suggestionList[suggestions.userInput],
      })
    )
      .then((res) => res.json())
      .then((data) => setAirQualityData(data));
    setIsLoading(false);
  };

  // update the state of suggestions as the user types
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


  // set the current user input to user's selection from the suggestion box
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
          <Grid item>
            {
              Object.keys(airQualityData).length == 0 ? <></> :
                <div className="main">
                  <h1>Most Recent Air Quality Data</h1>
                  <table className="content-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Parameters</th>
                        <th>Values</th>
                      </tr>
                    </thead>
                    <tbody>

                      {Object.keys(airQualityData).map((item, idx) => {
                        return (
                          <tr key={item + idx}>
                            <td>{idx + 1}</td>
                            <td>{airQualityData[item][1]}</td>
                            <td>{airQualityData[item][0] + airQualityData[item][2]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </ div>
            }


          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DeviceSearchBar;
