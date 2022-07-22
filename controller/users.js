const User = require("../model/user");

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userFound = await User.findOne({
      username: id,
    });

    if (!userFound) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      secret: userFound.secretQuestion,
    });
  } catch (error) {
    console.log(error);
  }
};
