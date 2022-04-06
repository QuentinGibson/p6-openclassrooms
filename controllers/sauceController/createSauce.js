const Sauce = require("../../models/sauce");

exports.createSauce = (req, res, next) => {
  let sauce;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper, heat } =
      req.body.sauce;

    sauce = new Sauce({
      name,
      userId: "userId",
      manufacturer,
      description,
      imageUrl: url + "/images/" + req.file.filename,
      mainPepper,
      heat,
      likes: 0,
      dislikes: 0,
      userLikes: [],
      userDislikes: [],
    });
  } else {
    sauce = {
      name: req.body.name,
      userId: "userId",
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      imageUrl: "",
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
      likes: 0,
      dislikes: 0,
      userLikes: [],
      userDislikes: [],
    };
  }
  sauce
    .save()
    .then(() => {
      res.status(200).json({
        message: "Sauce saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
