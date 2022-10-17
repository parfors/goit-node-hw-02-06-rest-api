const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middleWares");
const {
  schemas: { addSchema, putSchema, patchSchema },
} = require("../../models/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));
router.put(
  "/:contactId",
  isValidId,
  validateBody(putSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(patchSchema),
  ctrlWrapper(ctrl.patchFavorite)
);

module.exports = router;
