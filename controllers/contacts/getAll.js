const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  console.log("listContacts");
  const result = await listContacts();
  return res.status(200).json({ data: result, message: "success" });
};

module.exports = getAll;
