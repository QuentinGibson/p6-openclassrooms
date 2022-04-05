const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKENSECRECT);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId === userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(500).json({
      error: new Error("Invalid request"),
    });
  }
};
