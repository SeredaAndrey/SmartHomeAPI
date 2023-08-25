const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const room = new Schema({
  name: {
    type: String,
    default: null,
    required: [true, "Name is required"],
  },
  flor: {
    type: String,
    default: null,
    required: [true, "Name is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "home",
    default: null,
  },
});
