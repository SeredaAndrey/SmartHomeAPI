const {
  ValidateError,
  ConflictError,
  AutorizationError,
  FoundingError,
} = require("../middleware/errorHandler");
const {
  createUserService,
  loginUserService,
  logoutUserService,
  deleteUserService,
  patchUserService,
  getUsersService,
} = require("../services/userService");
const {
  workUserValidate,
  patchUserValidate,
} = require("../validate/userValidate");

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

const logoutUserController = async (req, res, next) => {
  const _id = req.user._id;
  const result = await logoutUserService(_id);
  if (result) {
    return res.status(204).json({
      message: "logout user successful",
      code: 204,
    });
  }
};

const deleteUserController = async (req, res, next) => {
  const owner = req.user._id;
  const { userId } = req.params;
  const data = await deleteUserService(owner, userId);
  if (data) {
    return res.status(200).json({
      message: "user deleted",
      code: 200,
    });
  } else throw new FoundingError("user not found");
};

const patchUserController = async (req, res, next) => {
  const owner = req.user._id;
  const { userId } = req.params;
  const body = req.body;

  const requestValidate = patchUserValidate.validate(req.body);

  if (!requestValidate.error) {
    const user = await patchUserService(owner, userId, body);
    if (!user) {
      throw new ConflictError("permision denied");
    }
    return res.status(200).json({
      message: "patching user data successful",
      code: 200,
      data: user,
    });
  } else throw new ValidateError(requestValidate.error);
};

const getUsersController = async (req, res, next) => {
  const userId = req.user._id;
  const users = await getUsersService(userId);

  if (users) {
    return res.status(200).json({
      message: "getting users data successful",
      code: 200,
      data: users,
    });
  }
  throw new FoundingError("users not found");
};

module.exports = {
  createUserController,
  loginUserController,
  logoutUserController,
  deleteUserController,
  patchUserController,
  getUsersController,
};
