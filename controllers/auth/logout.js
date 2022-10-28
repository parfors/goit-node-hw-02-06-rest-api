const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const logout = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, "Not authorized");
    }
    const verify = jwt.verify(token, SECRET_KEY);
    const user = User.findOneAndUpdate();
  } catch (error) {}
};

module.export = logout;
