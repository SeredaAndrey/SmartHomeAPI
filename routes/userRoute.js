const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const {
  createUserController,
  loginUserController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", asyncWrapper(loginUserController));

router.use(authMiddleware);

router.post("/create", asyncWrapper(createUserController));

module.exports = { userRouter: router };
