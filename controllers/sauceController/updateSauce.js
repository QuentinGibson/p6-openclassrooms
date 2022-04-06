const Sauce = require("../../models/sauce");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
exports.updateSauce = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken;
  let sauce = new Sauce({ _id: req.params._id });
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
      userId: userId,
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
      userId: userId,
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
