const { RequestError } = require("../../helpers");
const { User } = require("../../models/users");
const { createVerifyEmail, sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404);
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already passed" });
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);
  res.status(200).json("Verification email sent");
};

module.exports = resendEmail;
