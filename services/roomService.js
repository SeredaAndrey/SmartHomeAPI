const Room = require("../schemas/roomSchema");
const User = require("../schemas/userSchemas");

const createRoomService = async (owner, body, homeId) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === "true") {
    return await Room.create({ ...body, owner: homeId });
  }
  return;
};

const patchRoomService = async (owner, body, roomId) => {
  console.log("body: ", body);

  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === "true") {
    await Room.findOneAndUpdate({ _id: roomId }, body, { new: true });
    const room = await Room.findOne({ _id: roomId }, { __v: 0 });
    return room;
  }
  return;
};

const deleteRoomService = async (owner, roomId) => {
  const resOwner = await User.findOne({ _id: owner });
  if (resOwner.admin === "true") {
    return Room.findOneAndRemove({ _id: roomId });
  }
  return;
};

const getRoomService = async (homeId) => {
  return await Room.find({ owner: homeId });
};

module.exports = {
  createRoomService,
  patchRoomService,
  deleteRoomService,
  getRoomService,
};
