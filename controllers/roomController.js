const {
  ValidateError,
  ConflictError,
  FoundingError,
} = require("../middleware/errorHandler");
const {
  createRoomService,
  patchRoomService,
  deleteRoomService,
  getRoomService,
} = require("../services/roomService");
const {
  createRoomValidate,
  patchRoomValidate,
} = require("../validate/roomValidate");

const createRoomController = async (req, res, next) => {
  const owner = req.user._id;
  const body = req.body;
  const { homeId } = req.query;

  const requestValidate = createRoomValidate.validate(req.body);

  if (!requestValidate.error) {
    const room = await createRoomService(owner, body, homeId);
    if (room) {
      return res.status(201).json({
        message: "room created",
        code: 201,
        data: room,
      });
    } else {
      throw new ConflictError("permission denied");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const patchRoomController = async (req, res, next) => {
  const owner = req.user._id;
  const body = req.body;
  const { roomId } = req.params;
  const requestValidate = patchRoomValidate.validate(req.body);

  if (!requestValidate.error) {
    const room = await patchRoomService(owner, body, roomId);
    if (room) {
      return res.status(201).json({
        message: "room data patching",
        code: 200,
        data: room,
      });
    } else {
      throw new ConflictError("permission denied");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const deleteRoomController = async (req, res, next) => {
  const owner = req.user._id;
  const { roomId } = req.params;

  const data = await deleteRoomService(owner, roomId);
  if (data) {
    return res.status(200).json({
      message: "room deleted",
      code: 200,
    });
  } else throw new FoundingError("room not found");
};

const getRoomController = async (req, res, next) => {
  const { homeId } = req.query;

  const rooms = await getRoomService(homeId);

  if (rooms) {
    return res.status(200).json({
      message: "getting rooms data successful",
      code: 200,
      data: rooms,
    });
  }
  throw new FoundingError("rooms not found");
};

module.exports = {
  createRoomController,
  patchRoomController,
  deleteRoomController,
  getRoomController,
};
