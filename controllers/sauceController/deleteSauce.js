const Sauce = require("../../models/sauce");
exports.deleteSauce = (req, res, next) => {
  Sauce.findByIdAndRemove({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({
          error: new Error("Sauce not found"),
        });
      }
      if (sauce.userId !== req.auth.userId) {
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
