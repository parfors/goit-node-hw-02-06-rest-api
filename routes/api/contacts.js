const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");
const { RequestError } = require("../../helpers/RequestError");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(4).required(),
});

const putSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(4),
}).min(1);

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    return res.status(200).json({ data: result, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    return res.status(200).json({ data: result, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addSchema.validate(body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await addContact(body);
    res.status(201).json({ data: result, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json({ data: result, message: "Deleted successful" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const { error } = putSchema.validate(body);
    console.log(error);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await updateContact(id, body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json({ data: result, message: "success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
