const { User } = require("../../models/users");
const bcrypt = require("bcrypt");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  if (user.verify === false) {
    throw RequestError(401, "Please verify your email");
  }
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { token },
    { returnDocument: "after" }
  );

  res.status(200).json({
    token: userWithToken.token,
    user: {
      email: userWithToken.email,
      subscription: userWithToken.subscription,
    },
  });
};

module.exports = login;
