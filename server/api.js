import axios from "axios";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const PORT = process.env.PORT;
const ATMO_KEY = process.env.ATMO_KEY;

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
    var new_row = {id: key, ...old};
    rows.push(new_row);
  }
  return rows;
}


async function updateDB() { 
  const latest_data = await getMeasurements();
  mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var conn = mongoose.connection;
  conn.collection('sensor_data').insertMany(latest_data);
}


async function statusCheck() {

  const config = { 
    method: 'GET',
    url: `https://api.atmocube.app/v1/public/devices/`,
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Authorization': `APIKey ${ATMO_KEY}`,
    }
  }

  const response = await axios.request(config);
  const data = {};
  for (let i=0; i < Object.keys(response.data).length; i++) { 
    let name = response.data[i].name;
    let status = response.data[i].status;
    data[name] = status;
  }
  return data
}


async function sendEmail() { 
  const statuses = await statusCheck();
  var offline = [];

  for (let name in statuses) { 
    if (statuses[name] == "offline") { 
      offline.push(name);
    }
  }

  if (offline.length > 0) { 
    offlineEmail([offline]);
  }
}

async function offlineEmail(offline_array){
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea2895c72077fc",
      pass: "c929d0d6abbb33"
    }
  })
  let text = "";
  for (const name in offline_array) {
    text += `${name} is offline.\n`
  }
  console.log(text);
  let message = { 
            from: "no-reply@email.com",
            to: "email@email.com",
            subject: "Device(s) Offline",
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

setInterval(async function() {
  await updateDB();
}, 60 * 1000);


// async function online() {
//   var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "ea2895c72077fc",
//       pass: "c929d0d6abbb33"
//     }
//   })
//   let text = "";
//   for (const device in req.body.devices) {
//     text += `${req.body.devices[device]} is back online.\n`
//   }
//   let message = { 
//             from: "no-reply@email.com",
//             to: req.body.email,
//             subject: "Device(s) Online",
//             text: text,
//   }
//   transport.sendMail(message, function(err,info) { 
//     if (err) { 
//       console.log(err);
//     } 
//     else { 
//       console.log(info);
//     }
//   })
// }
// )
   app.listen(PORT, () => console.log(`Server on port ${PORT || 9000}`))
