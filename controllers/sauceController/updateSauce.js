const Sauce = require("../../models/sauce");
exports.updateSauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  const userId = "userId";
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    if (!userId === req.body.sauce) {
      return res.status(400).json({ error: "Failed to update sauce" });
    }
    const {
      name,
      manufacturer,
      description,
      mainPepper,
      heat,
      likes,
      dislikes,
      userLikes,
      userDislikes,
    } = req.body.sauce;
    sauce = {
      _id: req.params._id,
      userId: "userid",
      name,
      manufacturer,
      description,
      mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat,
      likes,
      dislikes,
      userLikes,
      userDislikes,
    };
  } else {
    const userId = "userId";
    const {
      name,
      manufacturer,
      description,
      mainPepper,
      heat,
      likes,
      dislikes,
      userLikes,
      userDislikes,
    } = req.body;
    sauce = {
      _id: req.params._id,
      userId: "userId",
      name,
      manufacturer,
      description,
      mainPepper,
      heat,
      likes,
      dislikes,
      userLikes,
      userDislikes,
    };
  }
  Sauce.findByIdAndUpdate({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
