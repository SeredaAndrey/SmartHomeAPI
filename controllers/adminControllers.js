const { ConflictError, ValidateError } = require("../middleware/errorHandler");
const { createAdminService } = require("../services/adminService");
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
        admin,
      });
    } else {
      throw new ConflictError("This name is already use");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

module.exports = { createAdminController };
