const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchemas");
const Admin = require("../schemas/adminSchemas");

const createUserService = async (name, password, owner) => {
  const resOwner = await Admin.findOne({ _id: owner });
  if (resOwner.owner) {
    return;
  } else {
    const resUser = await User.findOne({ name, owner });
    if (resUser) {
      return;
    }
    const newUser = new User({ name, password, owner });
    await newUser.save();
    const user = await User.findOne({ name, owner }, { password: 0, __v: 0 });
    return { user };
  }
};

const loginUserService = async ({ name, password }) => {
  const resUser = await User.findOne({ name });
  if (resUser && (await bcrypt.compare(password, resUser.password))) {
    const token = jwt.sign(
      {
        _id: resUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );
    await User.findOneAndUpdate(
      { _id: resUser._id },
      { loggedIn: true },
      { new: true }
    );
    const user = await User.findOne(
      { _id: resUser._id },
      { password: 0, __v: 0 }
    );

    return { token, user };
  }
};

module.exports = { createUserService, loginUserService };
