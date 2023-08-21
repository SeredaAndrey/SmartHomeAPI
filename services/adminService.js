const jwt = require("jsonwebtoken");

const Admin = require("../schemas/adminSchemas");

const createAdminService = async ({ name, password }) => {
  const admin = await Admin.findOne({ name });

  if (admin) {
    return;
  }

  const newAdmin = new Admin({ name, password });
  await newAdmin.save();
  return await Admin.findOne({ name }, { password: 0, __v: 0 });
};

module.exports = { createAdminService };
