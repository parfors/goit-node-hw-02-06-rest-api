const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  const result = isValidObjectId(id);
  if (!result) {
    next(RequestError(400, "Invalid format id"));
  }
  next();
};

module.exports = { isValidId };
