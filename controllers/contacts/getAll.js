// const { listContacts } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  console.log("listContacts");
  const result = await Contact.find({}, "-createdAt -updatedAt");
  return res.status(200).json({ data: result, message: "success" });
};

module.exports = getAll;
