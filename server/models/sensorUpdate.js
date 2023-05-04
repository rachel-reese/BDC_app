import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let sensorUpdate = new Schema({
  id: String,
  dtm: Date,
  // name: String,
  price: Number,
  iaqi: Number,
  eiaqi: Number,
  iaqi: Number,
  avti: Number,
  tci: Number,
  co2: Number,
  pm1: Number,
  pm25: Number,
  pm10: Number,
  temperature: Number,
  humidity: Number,
  ch2o: Number,
  noise: Number,
  light: Number,
  pm4: Number,
  abs_humidity: Number,
  pressure: Number,
});

const model = mongoose.model("sensorUpdate", sensorUpdate);

export { model };