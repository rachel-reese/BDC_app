import { CircularProgress } from "@mui/material";
import "./AirQualityTable.css";
import { useState, useEffect } from 'react'
import axios from 'axios'

const AirQualityTable = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [airQualityData, setAirQualityData] = useState({});

  useEffect(
    () =>
      async function getDeviceMap() {
        setIsLoading(true);


        // fetch("/airQuality/getAirQualityData")
        //   .then((res) => res.json())
        //   .then((data) => setAirQualityData(data));
        let aqd = await getSensorMeasurements();
        setAirQualityData(aqd[0]);
        setIsLoading(false);
      },
    []
  );
  console.log(airQualityData);

  async function getSensorMeasurements() { 
    const options = {
      method: "GET",
      url: `http://localhost:5001/api/latest_measurements`,
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
                  return (
                    <tr key={item}>

                      <td>{idx + 1}</td>
                      <td>{item}</td>
                      <td>{airQualityData[item]}</td>
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
