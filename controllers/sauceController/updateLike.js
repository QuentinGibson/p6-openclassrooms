const Sauce = require("../../models/sauce");

exports.updateLike = (req, res, next) => {
  let currentSauce = Sauce.find({ _id: req.params._id });
  let sauce;
  if (currentSauce.usersLiked.includes("userId")) {
    if (req.params.like === 1) {
      return res.status(400).json({
        message: "You already liked this sauce",
      });
    } else if (req.params.like === -1) {
      sauce = new Sauce(
        { _id: req.params._id },
        {
          $inc: { dislike: 1 },
          $inc: { like: -1 },
          $pull: { usersLiked: "userId" },
          $push: { usersDisliked: "userId" },
        }
      );
    } else {
      sauce = new Sauce(
        { _id: req.params._id },
        {
          $inc: { like: -1 },
          $pull: { usersLiked: "userId" },
        }
      );
    }
  } else if (currentSauce.usersDisliked.includes("userId")) {
    if (req.params.like === 1) {
      sauce = new Sauce(
        { _id: req.params._id },
        {
          $inc: { dislike: -1 },
          $inc: { like: 1 },
          $push: { usersLiked: "userId" },
          $pull: { usersDisliked: "userId" },
        }
      );
    } else if (req.params.like === -1) {
      res.status(400).json({
        message: "You already disliked this sauce",
      });
    } else {
      sauce = new Sauce(
        { _id: req.params._id },
        {
          $inc: { dislike: -1 },
          $pull: { usersDisliked: "userId" },
        }
      );
    }
  } else {
    if (req.params.like === 1) {
      sauce = new Sauce(
        { _id: req.params._id },
        {
          $inc: { like: 1 },
          $push: { usersLiked: "userId" },
        }
      );
    } else if (req.params.like === -1) {
      sauce = new Sauce(
        { _id: req.params._id },
        {
          $inc: { dislike: 1 },
          $push: { usersDisliked: "userId" },
        }
      );
    } else {
      return res.stauts(400).json({ message: "Nothing happned" });
    }
  }
  Sauce.findByIdAndUpdate({ _id: req.params._id }, sauce).then((sauce) => {
    res.status(200).json({ userId: "userId", like: sauce.likes });
  });
};
