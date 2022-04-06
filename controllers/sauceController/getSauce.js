const Sauce = require("../../models/sauce");

exports.getSauce = (req, res, next) => {
  Sauce.findById(req.body.id)
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      error;
    });
};
