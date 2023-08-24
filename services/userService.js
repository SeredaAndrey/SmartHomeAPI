const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchemas");

const createUserService = async (name, password, owner) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === false) {
    return;
  } else {
    const resUser = await User.findOne({ name, owner });
    if (resUser) {
      return;
    }
    const newUser = new User({ name, password, owner, admin: false });
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

const logoutUserService = async (_id) => {
  return await User.findByIdAndUpdate(
    { _id, loggedIn: true },
    { loggedIn: false },
    { new: true }
  );
};

const deleteUserService = async (owner, userId) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === false) {
    return;
  } else {
    return await User.findOneAndRemove({ _id: userId });
  }
};

module.exports = {
  createUserService,
  loginUserService,
  logoutUserService,
  deleteUserService,
};
