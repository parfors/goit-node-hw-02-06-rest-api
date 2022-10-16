const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers/RequestError");

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  return res.status(200).json({ data: result, message: "success" });
};

module.exports = getById;
