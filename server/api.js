import axios from "axios";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { model as sensorUpdateModel } from './models/sensorUpdate.js';
import { model as sensorStatusModel } from './models/sensorStatus.js';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const PORT = process.env.PORT;
const ATMO_KEY = process.env.ATMO_KEY;
const sensorUpdate = sensorUpdateModel;
const sensorStatus = sensorStatusModel;

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

async function getMeasurements() {
  console.log(ATMO_KEY)
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
    var new_row = {id: key, ...old};
    rows.push(new_row);
  }
  return rows;
}

async function deviceCheck() {

  const config = { 
    method: 'GET',
    url: `https://api.atmocube.app/v1/public/devices/`,
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Authorization': `APIKey ${ATMO_KEY}`,
    }
  }

  const response = await axios.request(config);
  for (let i=0; i < Object.keys(response.data).length; i++) { 
      data = { 
        id: response.data[i].id,
        name: response.data[i].name,
        status: response.data[i].status,
      }
      let device = new sensorStatus(data);
      if (conn.collection('sensorstatuses').find({'id': data['id']}).limit(1)) { 
        continue;
      } else { 
        let new_device = new sensorStatus(data);
        await new_device.save();
      }
  }
}

async function offlineEmail(device_name){
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea2895c72077fc",
      pass: "c929d0d6abbb33"
    }
  })
  let text =`${device_name} is offline.\n`
  
  let message = { 
            from: "no-reply@email.com",
            to: "email@email.com",
            subject: `${device_name} is Offline`,
            text: text,
  }
  transport.sendMail(message, function(err,info) { 
    if (err) { 
      console.log(err);
    } 
    else { 
      console.log(info);
    }
  })
}

async function onlineEmail(device_name) {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea2895c72077fc",
      pass: "c929d0d6abbb33"
    }
  })
  let text =`${device_name} is back online.\n`
  let message = { 
            from: "no-reply@email.com",
            to: req.body.email,
            subject: `${device_name} is Online`,
            text: text,
  }
  transport.sendMail(message, function(err,info) { 
    if (err) { 
      console.log(err);
    } 
    else { 
      console.log(info);
    }
  })
}

async function updateDB() { 
  const latest_data = await getMeasurements();
  for (const index in latest_data) { 
    let current_sensor_update = new sensorUpdate(latest_data[index]);
    if (sensorStatus.exists({'id': current_sensor_update['id']})) { 
      // continue;
    } else { 
      await deviceCheck();
    }
    if (conn.collection('sensorupdates').find({"id": current_sensor_update['id'], "dtm": current_sensor_update['dtm']}).limit(1)) { 
      console.log('oh no');
      if (conn.collection('sensorstatuses').find({'id': current_sensor_update['id'], 'status': 'online'}).limit(1)) { 
        //SEND EMAIL AND UPDATE DB TO OFFLINE
        let device_name = conn.collection('sensorstatuses').find({'id': current_sensor_update['id']}).limit(1);
        device_name = device_name["name"];
        await offlineEmail();
        let sensor_stat = new sensorStatus({'id': current_sensor_update['id'], 'name': ' ', 'status': 'offline'});
        await sensor_stat.save();

      } else {
        // continue;
       }
    } else { 
      if (conn.collection('sensorstatuses').find({'id': current_sensor_update['id'], 'status': 'offline'}).limit(1)) { 
        //SEND EMAIL AND UPDATE DB TO ONLINE
        let device_name = conn.collection('sensorstatuses').find({'id': current_sensor_update['id']}).limit(1);
        device_name = device_name["name"];
        await onlineEmail();
        let sensor_stat = new sensorStatus({'id': current_sensor_update['id'], 'name': ' ', 'status': 'online'});
        await sensor_stat.save();
      } else {
        // continue;
      }
      //INSERT CURRENT SENSIR UPDATE INTO DB
      console.log('here');
      await current_sensor_update.save();
    }
  }
}

setInterval(async function() {
  await updateDB();
  console.log('working');
}, 60 * 1000);


app.get('/api/latest_measurements', async (req, res) => { 
  const ids = await sensorStatus.find({}).lean();
  const current_update = await sensorUpdate.find({'id': ids[0]['id']}).sort({_id: -1}).limit(1);
  // console.log(ids[0]["id"]);
  res.send(current_update);
})


   app.listen(PORT, () => console.log(`Server on port ${PORT || 9000}`))


