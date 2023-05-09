import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import randomWords from "random-words"

const getDeviceID = (req, res) => {

  const listOfWords = randomWords({exactly:300, seed:"my-seed"})
  getDevices().then((response) => {

    const device_word = {}
    for (let [idx, device] of response.data.entries()){
      device_word[listOfWords[idx]] = device.id
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
const getAirQualityData = (req, res) => {


  getDevices().then((res) => console.log(res.data))
  res.send({
    iaqi: [57, "IAQI", ""],
    temperature: [24.08, "Temperature", "°C"],
    humidity: [52.36, "Humidity", "%"],
    abs_humidity: [9, "Abs. Humidity", ""],
    nox_index: [1, "NOx Index", ""],
    voc_index: [99, "VOC Index", ""],
    co2: [1089, "CO2", " ppm"],
    pm1: [18.7, "PM1", ""],
    pm_2_5: [19.8, "PM2.5", ""],
    pm_10: [19.8, "PM10", ""],
    pm_4: [19.8, "PM4", ""],
    noise: [53, "Noise", " db"],
    ch2o: [0.010, "CH2O", " ppm"],
    light: [16, "Light", " Lux"],
    pressure: [1009.17, "Pressure", ""],
  });
};

export { getDeviceID, getAirQualityData };
