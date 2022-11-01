const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = page * limit - limit;
  const { _id: owner } = req.user;
  const findQuery = favorite ? { owner, favorite } : { owner };
  const result = await Contact.find(findQuery, "-createdAt -updatedAt")
    .populate("owner", "email subscription")
    .skip(skip)
    .limit(limit);

  return res.status(200).json({ data: result, message: "success" });
};

module.exports = getAll;
