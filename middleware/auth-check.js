const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = {
      email: decodeToken.email,
      username: decodeToken.username,
      userId: decodeToken.userId,
    };
    next();
  } catch (err) {
    res.status(401).json({
      message: "user is not authenticated!",
    });
  }
};
