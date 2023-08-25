const Home = require("../schemas/homeSchema");
const User = require("../schemas/userSchemas");

const createHomeService = async (owner, body) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === "true") {
    return await Home.create({ ...body, owner: owner });
  }
  return;
};

const patchHomeService = async (owner, homeId, body) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === "true") {
    await Home.findOneAndUpdate({ _id: homeId }, body, { new: true });
    const home = await Home.findOne({ _id: homeId }, { __v: 0 });
    return home;
  }
  return;
};

const deleteHomeService = async (owner, homeId) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === "true") {
    return Home.findOneAndRemove({ _id: homeId });
  }
  return;
};

const getHomeService = async (owner) => {
  const user = await User.findOne({ _id: owner });
  if (user.admin === "true") {
    return await Home.find({ owner: owner });
  }
  return await Home.find({ owner: user.owner });
};

module.exports = {
  createHomeService,
  patchHomeService,
  deleteHomeService,
  getHomeService,
};
