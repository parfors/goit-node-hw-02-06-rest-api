const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middleWares");
const {
  schemas: { addSchema, putSchema, patchSchema },
} = require("../../models/contacts");
const { authenticate } = require("../../middleWares");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));
router.post("/", authenticate, validateBody(addSchema), ctrlWrapper(ctrl.add));
router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(putSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(patchSchema),
  ctrlWrapper(ctrl.patchFavorite)
);

module.exports = router;
