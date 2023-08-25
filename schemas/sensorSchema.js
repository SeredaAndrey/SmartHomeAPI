const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sensor = new Schema({
  name: {
    type: String,
    default: null,
    required: [true, "Name is required"],
  },
  type: {
    type: String,
    enum: ["temperature", "humidity", "illumination"],
    default: null,
    required: [true, "type sensore is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
    default: null,
  },
});

const Sensor = mongoose.model("sensor", sensor);

module.exports = Sensor;
