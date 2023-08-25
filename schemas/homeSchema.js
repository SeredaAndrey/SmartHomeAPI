const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const home = new Schema({
  name: {
    type: String,
    default: null,
    required: [true, "Name is required"],
  },
  adressCountry: {
    type: String,
    default: null,
  },
  adressCity: {
    type: String,
    default: null,
  },
  adressStreet: {
    type: String,
    default: null,
  },
  adressHomeNumber: {
    type: String,
    default: null,
  },
  adressApartamentNumber: {
    type: String,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
});

const Home = mongoose.model("home", home);

module.exports = Home;
