const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.resetUserPassword = async (req, res) => {
  const { resUser, answer, newPassword } = req.body;

  try {
    const user = await User.findOne({
      username: resUser,
    })
      .select("+password")
      .select("+secretAnswer");

    const newResPasswordEncrypted = await bcrypt.hash(newPassword, 12);

    if (!(await bcrypt.compare(answer, user.secretAnswer)))
      return res.status(400).json({ message: "Wrong secret answer!" });

    await User.findOneAndUpdate(user.username, {
      $set: {
        password: newResPasswordEncrypted,
      },
    });

    res.status(200).json({ message: "Password reseted!" });
  } catch (error) {
    console.log(error);
  }
};
