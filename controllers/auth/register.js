const { User } = require("../../models/users");
const bcrypt = require("bcrypt");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");

const register = async (req, res, next) => {
  const { email, subscription, password } = req.body;
  const verificationToken = uuid();
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);
  console.log(mail);

  await sendEmail(mail);

  res.status(201).json({
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = register;

// const { User } = require("../../models/users");
// const bcrypt = require("bcrypt");
// const { RequestError } = require("../../helpers");

// const register = async (req, res, next) => {
//   const body = req.body;
//   const user = await User.findOne({ email: body.email });
//   console.log(user);
//   if (user) {
//     throw RequestError(409, "Email in use");
//   }
//   const hashPassword = await bcrypt.hash(body.password, 10);
//   const result = await User.create({
//     email: body.email,
//     password: hashPassword,
//     subscription: body.subscription,
//   });
//   const { email, subscription } = result;
//   res.status(201).json({ email, subscription });
// };

// module.exports = register;
