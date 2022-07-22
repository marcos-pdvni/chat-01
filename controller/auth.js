const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username,
    }).select("+password");

    if (!user) return res.status(404).json({ message: "User not found!" });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ message: "Username or password incorrect!" });

    const token = jwt.sign(
      {
        username: user.username,
        secret: user.secretQuestion,
        imageUrl: user.profileImage,
        userFriends: user.friends,
      },
      process.env.JWT_SECRET
    );

    return res
      .status(200)
      .cookie("uauth", token)
      .json({ message: "Logged in." });
  } catch (error) {
    console.log(error);
  }
};
