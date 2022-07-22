const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const { username } = req.body;

  const token = jwt.sign(
    {
      username: username,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).cookie("uauth", token).redirect("/application");
};
