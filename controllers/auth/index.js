const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const patchSubscription = require("./patchSubscription");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  patchSubscription,
};
