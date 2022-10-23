const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middleWares");
const {
  schemas: { userRegistrationSchema },
} = require("../../models/users");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/signup",
  validateBody(userRegistrationSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(userRegistrationSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
