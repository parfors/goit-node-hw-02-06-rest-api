const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");

const subscriptionTypes = ["starter", "pro", "business"];

const patchSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  console.log(subscription);
  const { _id } = req.user;
  if (!subscriptionTypes.includes(subscription)) {
    throw RequestError(400, "Bad request");
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      returnDocument: "after",
    }
  );
  res.status(200).json(result);
};

module.exports = patchSubscription;
