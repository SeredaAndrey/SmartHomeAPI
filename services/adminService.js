const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchemas");

const createAdminService = async ({ name, password }) => {
  const resUser = await User.findOne({ name });
  if (resUser) {
    return;
  }
  const newUser = new User({ name, password });
  await newUser.save();
  const user = await User.findOne({ name }, { password: 0, __v: 0 });
  return { user };
};

const loginAdminService = async ({ name, password }) => {
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

const logoutAdminService = async (_id) => {
  return await User.findByIdAndUpdate(
    { _id, loggedIn: true },
    { loggedIn: false },
    { new: true }
  );
};

const patchAdminService = async (_id, body) => {
  return await User.findOneAndUpdate(
    {
      _id,
    },
    body,
    { new: true }
  );
};

module.exports = {
  createAdminService,
  loginAdminService,
  logoutAdminService,
  patchAdminService,
};
