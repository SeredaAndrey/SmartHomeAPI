const { ValidateError, ConflictError } = require("../middleware/errorHandler");
const { createUserService } = require("../services/userService");
const { workUserValidate } = require("../validate/userValidate");

const createUserController = async (req, res, next) => {
  const requestValidate = workUserValidate.validate(req.body);
  const { name, password } = req.body;
  const owner = req.user._id;

  if (!requestValidate.error) {
    const user = await createUserService(name, password, owner);
    if (user) {
      return res.status(201).json({
        message: "user created",
        code: 201,
        data: user,
      });
    } else {
      throw new ConflictError("This name is already use");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

module.exports = { createUserController };
