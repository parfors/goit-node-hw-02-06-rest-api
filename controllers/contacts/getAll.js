const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner", "email subscription");
  return res.status(200).json({ data: result, message: "success" });
};

module.exports = getAll;
