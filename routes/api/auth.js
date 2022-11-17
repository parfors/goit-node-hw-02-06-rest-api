const express = require("express");
const router = express.Router();
const { validateBody, authenticate, upload } = require("../../middleWares");
const {
  schemas: { userRegistrationSchema, emailVerificationSchema },
} = require("../../models/users");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/signup",
  validateBody(userRegistrationSchema),
  ctrlWrapper(ctrl.register)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post(
  "/verify/",
  validateBody(emailVerificationSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.post(
  "/login",
  validateBody(userRegistrationSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch("/", authenticate, ctrlWrapper(ctrl.patchSubscription));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
