import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let sensorStatus = new Schema({
  id: String,
  name: String,
  status: String,
});

const model = mongoose.model("sensorStatus", sensorStatus);

export { model };