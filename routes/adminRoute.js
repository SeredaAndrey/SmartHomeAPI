const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const {
  createAdminController,
  loginAdminController,
  logoutAdminController,
} = require("../controllers/adminControllers");

const router = express.Router();

router.post("/create", asyncWrapper(createAdminController));
router.post("/login", asyncWrapper(loginAdminController));

router.use(authMiddleware);

router.get("/logout", asyncWrapper(logoutAdminController));

module.exports = { adminRouter: router };
