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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "home",
    default: null,
  },
});

const Room = mongoose.model("room", room);

module.exports = Room;
