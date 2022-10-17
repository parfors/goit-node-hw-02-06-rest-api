const { Contact } = require("../../models/contacts.js");
const { RequestError } = require("../../helpers");

const patchFavorite = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const result = await Contact.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ data: result, message: "success" });
};

module.exports = patchFavorite;
