const {
  createHomeService,
  patchHomeService,
  deleteHomeService,
  getHomeService,
} = require("../services/homeService");
const {
  createHomeValidate,
  patchHomeValidate,
} = require("../validate/homeValidate");

const createHomeController = async (req, res, next) => {
  const owner = req.user._id;
  const body = req.body;
  const requestValidate = createHomeValidate.validate(req.body);

  if (!requestValidate.error) {
    const home = await createHomeService(owner, body);
    if (home) {
      return res.status(201).json({
        message: "home created",
        code: 201,
        data: home,
      });
    } else {
      throw new ConflictError("permission denied");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const patchHomeController = async (req, res, next) => {
  const owner = req.user._id;
  const body = req.body;
  const { homeId } = req.params;

  const requestValidate = patchHomeValidate.validate(req.body);

  if (!requestValidate.error) {
    const home = await patchHomeService(owner, homeId, body);
    if (home) {
      return res.status(201).json({
        message: "home data patching",
        code: 200,
        data: home,
      });
    } else {
      throw new ConflictError("permission denied");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const deleteHomeController = async (req, res, next) => {
  const owner = req.user._id;
  const { homeId } = req.params;

  const data = await deleteHomeService(owner, homeId);
  if (data) {
    return res.status(200).json({
      message: "home deleted",
      code: 200,
    });
  } else throw new FoundingError("home not found");
};

const getHomeController = async (req, res, next) => {
  const owner = req.user._id;

  const homes = await getHomeService(owner);

  if (homes) {
    return res.status(200).json({
      message: "getting homes data successful",
      code: 200,
      data: homes,
    });
  }
  throw new FoundingError("homes not found");
};

module.exports = {
  createHomeController,
  patchHomeController,
  deleteHomeController,
  getHomeController,
};
