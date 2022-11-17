const mongoose = require("mongoose");
const Joi = require("joi");
const { handelSaveErrors } = require("../helpers");

const emailRegexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegexp,
  },
  subscription: {
    type: String,
    enum: subscriptionTypes,
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  verify: {
    type: Boolean,
    default: false,
  },
});

const userRegistrationSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailRegexp),
  subscription: Joi.string().valid(...subscriptionTypes),
});

const emailVerificationSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
});

userSchema.post("save", handelSaveErrors);

const User = mongoose.model("users", userSchema);

const schemas = {
  userRegistrationSchema,
  emailVerificationSchema,
};

module.exports = {
  schemas,
  User,
};
