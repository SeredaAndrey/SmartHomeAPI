const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../schemas/adminSchemas");

const createAdminService = async ({ name, password }) => {
  const resAdmin = await Admin.findOne({ name });
  if (resAdmin) {
    return;
  }
  const newAdmin = new Admin({ name, password });
  await newAdmin.save();
  const admin = await Admin.findOne({ name }, { password: 0, __v: 0 });
  return { admin };
};

const loginAdminService = async ({ name, password }) => {
  const resAdmin = await Admin.findOne({ name });
  if (resAdmin && (await bcrypt.compare(password, resAdmin.password))) {
    const token = jwt.sign(
      {
        _id: resAdmin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    await Admin.findOneAndUpdate(
      { _id: resAdmin._id },
      { loggedIn: true },
      { new: true }
    );
    const admin = await Admin.findOne(
      { _id: resAdmin._id },
      { password: 0, __v: 0 }
    );

    return { token, admin };
  }
};

const logoutAdminService = async (_id) => {
  return await Admin.findByIdAndUpdate(
    { _id, loggedIn: true },
    { loggedIn: false },
    { new: true }
  );
};

const patchAdminService = async (_id, body) => {
  return await Admin.findOneAndUpdate(
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
