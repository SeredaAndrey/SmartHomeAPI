const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const {
  createHomeController,
  patchHomeController,
  deleteHomeController,
  getHomeController,
} = require("../controllers/homeController");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", asyncWrapper(createHomeController));
router.patch("/:homeId", asyncWrapper(patchHomeController));
router.delete("/:homeId", asyncWrapper(deleteHomeController));
router.get("/", asyncWrapper(getHomeController));

module.exports = { homeRouter: router };
