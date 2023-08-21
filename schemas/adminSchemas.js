const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const admin = new Schema(
  {
    name: {
      type: String,
      default: null,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullName: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    inerfaceLanguage: {
      type: String,
      enum: ["en", "ru", "ua"],
      default: "en",
    },
  },
  { timestamps: true }
);

admin.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const Admin = mongoose.model("admin", admin);

module.exports = Admin;
