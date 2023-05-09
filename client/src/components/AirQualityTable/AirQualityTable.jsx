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
      fetch("https://iaq.hucs.ml/airQuality/getAirQualityData")
        .then((res) => res.json())
        .then((data) => setAirQualityData(data));

      setIsLoading(false);
    },
    []
  );
  console.log(airQualityData);

  async function getSensorMeasurements() { 
    const options = {
      method: "GET",
      url: `https://iaq.hucs.ml/latest_measurements`,
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await axios.request(options);
    return response.data;
  }

  
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
