const {
  ValidateError,
  ConflictError,
  AutorizationError,
} = require("../middleware/errorHandler");
const {
  createUserService,
  loginUserService,
} = require("../services/userService");
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

const loginUserController = async (req, res, next) => {
  const requestValidate = workUserValidate.validate(req.body);
  const body = req.body;

  if (!requestValidate.error) {
    const user = await loginUserService(body);
    if (!user) {
      throw new AutorizationError("Name or password is wrong");
    }
    return res.status(200).json({
      message: "logged user successful",
      code: 200,
      data: user,
    });
  } else throw new ValidateError(requestValidate.error);
};

module.exports = { createUserController, loginUserController };
