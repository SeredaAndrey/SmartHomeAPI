const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");

const { createAdminController } = require("../controllers/adminControllers");

const router = express.Router();

router.post("/create", asyncWrapper(createAdminController));

router.use(authMiddleware);

module.exports = { adminRouter: router };
