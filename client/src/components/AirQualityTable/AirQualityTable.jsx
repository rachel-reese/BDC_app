import { CircularProgress } from "@mui/material";
import "./AirQualityTable.css";
import { useState, useEffect } from 'react'

const AirQualityTable = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [airQualityData, setAirQualityData] = useState({});

  useEffect(
    () =>
      async function getDeviceMap() {
        setIsLoading(true);


        fetch("/airQuality/getAirQualityData")
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

                {Object.entries(airQualityData).map((item, idx) => {
                  return (
                    <tr key={item[1][1]+idx}>

                      <td>{idx + 1}</td>
                      <td>{item[1][1]}</td>
                      <td>{item[1][0]+item[1][2]}</td>
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