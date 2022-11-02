const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/users");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;
  const extension = tempUpload.split(".").pop();

  const newAvatarName = `${String(_id)}.${extension}`;
  const avatarURL = path.join("avatars", newAvatarName);
  const resultUpload = path.join(avatarsDir, newAvatarName);

  (await Jimp.read(tempUpload)).resize(250, 250).writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { returnDocument: "after" }
  );

  res.status(200).json({ avatarURL: result.avatarURL });
};

module.exports = updateAvatar;
