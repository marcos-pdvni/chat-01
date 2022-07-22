const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.cookies.uauth;

  if (!token) return res.status(401).redirect("/");

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!verifiedToken) return res.status(401).redirect("/");

  res.status(200).cookie("user", verifiedToken);

  return next();
};
