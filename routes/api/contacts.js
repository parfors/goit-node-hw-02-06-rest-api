const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middleWares");
const { addSchema, putSchema } = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));
router.put(
  "/:contactId",
  validateBody(putSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
