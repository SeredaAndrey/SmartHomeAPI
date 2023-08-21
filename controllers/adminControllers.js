const {
  ConflictError,
  ValidateError,
  AutorizationError,
} = require("../middleware/errorHandler");
const {
  createAdminService,
  loginAdminService,
} = require("../services/adminService");
const { workAdminValidate } = require("../validate/adminValidate");

const createAdminController = async (req, res, next) => {
  const requestValidate = workAdminValidate.validate(req.body);
  const body = req.body;

  if (!requestValidate.error) {
    const admin = await createAdminService(body);
    if (admin) {
      return res.status(201).json({
        message: "admin created",
        code: 201,
        data: admin,
      });
    } else {
      throw new ConflictError("This name is already use");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const loginAdminController = async (req, res, next) => {
  const requestValidate = workAdminValidate.validate(req.body);
  const body = req.body;

  if (!requestValidate.error) {
    const admin = await loginAdminService(body);
    if (!admin) {
      throw new AutorizationError("Name or password is wrong");
    }
    return res.status(200).json({
      message: "logged admin successful",
      code: 200,
      data: admin,
    });
  } else throw new ValidateError(requestValidate.error);
};

module.exports = { createAdminController, loginAdminController };
