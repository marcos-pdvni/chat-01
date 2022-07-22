const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { username, password, secret, secretAnswer } = req.body;

  try {
    const user = await User.findOne({
      username: username,
    });

    if (user) return res.status(406).json({ message: "User already exists." });

    const encryptedPassword = await bcrypt.hash(password, 12);
    const encryptedAnswer = await bcrypt.hash(secretAnswer, 12);

    const newUser = await User.create({
      username: username,
      password: encryptedPassword,
      secretQuestion: secret,
      secretAnswer: encryptedAnswer,
    });

    await newUser.save();

    res.status(201).json({ message: "User succesfully created." });
  } catch (error) {
    console.log(error);
  }
};
