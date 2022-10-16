// const { addContact } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const result = await Contact.create(body);
  res.status(201).json({ data: result, message: "success" });
};

module.exports = add;
