import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import randomWords from "random-words"

const getDeviceID = (req, res) => {
  const listOfWords = randomWords({ exactly: 300, seed: "my-seed" })
  getDevices().then((response) => {

    const device_word = {}
    for (let [idx, device] of response.data.entries()) {
      device_word[listOfWords[idx]] = device.device_id
    }
    res.send(device_word)

  })

};

const ATMO_KEY = process.env.ATMO_KEY;

async function getDevices() {
  const config = {
    method: 'GET',
    url: `https://api.atmocube.app/v1/public/devices/`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `APIKey ${ATMO_KEY}`,
    }
  }
  const devices = await axios.request(config);
  return devices;
}
async function getMeasurements() {
  const config_latest_measurements = {
    method: 'GET',
    url: `https://api.atmocube.app/v1/public/latest_measurements/`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `APIKey ${ATMO_KEY}`,
    }
  };
  const latest_measurements = await axios.request(config_latest_measurements);
  var rows = [];

  for (const key in latest_measurements.data) {
    var old = latest_measurements.data[key];
    var new_row = { id: key, ...old };
    rows.push(new_row);
  }
  return rows;
}
const getAirQualityData = (req, res) => {

  const deviceID = req.query.deviceID;
  let dataTable = {
    iaqi: ["IAQI", ""],
    temperature: ["Temperature", "°C"],
    humidity: ["Humidity", "%"],
    abs_humidity: ["Abs. Humidity", ""],
    noxindex: ["NOx Index", ""],
    vocindex: ["VOC Index", ""],
    co2: ["CO2", " ppm"],
    pm1: ["PM1", ""],
    pm25: ["PM2.5", ""],
    pm10: ["PM10", ""],
    pm4: ["PM4", ""],
    noise: ["Noise", " db"],
    ch2o: ["CH2O", " ppm"],
    light: ["Light", " Lux"],
    pressure: ["Pressure", ""],
  }


  getDevices().then((response) => {
    for (let device of response.data) {
      if (device.device_id == deviceID) {
        const id = device.id
        getMeasurements().then((measurements) => {
          for (let device of measurements) {
            if (device.id == id) {
              for (let [key, value] of Object.entries(dataTable)) {
                dataTable[key] = [device[key], ...value]
              }
              return res.send(dataTable)
            }
          }
        }
        )
      }
    }
  })
};

export { getDeviceID, getAirQualityData };
