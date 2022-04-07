const Sauce = require("../../models/sauce");
const jwt = require("jsonwebtoken");
exports.deleteSauce = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const { userId } = decodedToken;
  Sauce.findByIdAndRemove(req.params.id)
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({
          error: new Error("Sauce not found"),
        });
      }
      if (sauce.userId !== userId) {
        return res.status(404).json({
          error: new Error("Sauce not found"),
        });
      }
      res.status(201).json({
        message: "Sauce deleted successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
