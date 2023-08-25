const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const {
  createUserController,
  loginUserController,
  logoutUserController,
  deleteUserController,
  patchUserController,
  getUsersController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", asyncWrapper(loginUserController));

router.use(authMiddleware);

router.post("/create", asyncWrapper(createUserController));
router.get("/logout", asyncWrapper(logoutUserController));
router.delete("/:userId", asyncWrapper(deleteUserController));
router.patch("/:userId", asyncWrapper(patchUserController));
router.get("/", asyncWrapper(getUsersController));

module.exports = { userRouter: router };
