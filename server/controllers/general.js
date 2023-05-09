import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
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
  console.log(devices)

  return devices;
}

const getDeviceStatus = (req, res) => {
  const deviceID = req.query.deviceID;

   getDevices().then((response) => {
    console.log(deviceID)

    for (let [idx, device] of response.data.entries()){

      if (device.device_id == deviceID){
        console.log(device.device_id, deviceID)
        return res.send({status: device.status})
      }
    }
    return res.send({status: "not found"})

  }) 
  
  };

export { getDeviceStatus };
