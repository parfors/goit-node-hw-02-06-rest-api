const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const patchSubscription = require("./patchSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  patchSubscription,
  updateAvatar,
  verify,
  resendEmail,
};
