const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const body = req.body;
  const result = await addContact(body);
  res.status(201).json({ data: result, message: "success" });
};

module.exports = add;
