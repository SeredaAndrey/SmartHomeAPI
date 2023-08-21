const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchemas");

const createUserService = async ({ name, password, owner }) => {
  const resUser = await User.findOne({ name, owner });
  if (resUser) {
    return;
  }
  const newUser = new User({ name, password, owner });
  await newUser.save();
  const user = await User.findOne({ name, owner }, { password: 0, __v: 0 });
  return { user };
};

module.exports = { createUserService };
