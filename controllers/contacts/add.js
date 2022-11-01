// const { addContact } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const body = req.body;
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...body, owner });
  res.status(201).json({ data: result, message: "success" });
};

module.exports = add;
