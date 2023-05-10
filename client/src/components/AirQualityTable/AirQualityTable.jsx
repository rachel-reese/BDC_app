import { CircularProgress, Button } from "@mui/material";
import "./AirQualityTable.css";
import { useState, useEffect } from 'react'
import axios from 'axios'

const AirQualityTable = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [airQualityData, setAirQualityData] = useState({});

  useEffect(
    () => {
      setIsLoading(true);
      fetch("https://iaq.hucs.ml/airQuality/getAirQualityData?" +
        new URLSearchParams({
          deviceID: "4c75255d12d8",
        })
      )
        .then((res) => res.json())
        .then((data) => setAirQualityData(data));

      setIsLoading(false);
    },
    []
  );



  return (
    <>
      {isLoading ? (<CircularProgress />) :

        (
          <div className="main">

            <h1>Atmo Cube Dashboard</h1>

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
                  console.log(item)
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





        )

      }
    </>

  );
}

export default AirQualityTable
