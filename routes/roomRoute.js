const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const {
  createRoomController,
  patchRoomController,
  deleteRoomController,
  getRoomController,
} = require("../controllers/roomController");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", asyncWrapper(createRoomController));
router.patch("/:roomId", asyncWrapper(patchRoomController));
router.delete("/:roomId", asyncWrapper(deleteRoomController));
router.get("/", asyncWrapper(getRoomController));

module.exports = { roomRouter: router };
