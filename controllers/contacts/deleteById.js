const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers/RequestError");

const deleteById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ data: result, message: "Deleted successful" });
};

module.exports = deleteById;
