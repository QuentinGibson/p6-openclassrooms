const Sauce = require("../../models/sauce");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.updateLike = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const { userId } = decodedToken;
  Sauce.findById({ _id: req.params.id }).then((currentSauce) => {
    if (!currentSauce) {
      return res.status(400).json({
        message: "Could not find sauce ",
      });
    }
    let update;
    if (currentSauce.usersLiked.includes(userId)) {
      if (req.body.like === 1) {
        return res.status(400).json({
          message: "You already liked this sauce",
        });
      } else if (req.body.like === -1) {
        update = {
          $inc: { dislikes: 1 },
          $inc: { likes: -1 },
          $pull: { usersLiked: userId },
          $push: { usersDisliked: userId },
        };
      } else {
        update = {
          $inc: { likes: -1 },
          $pull: { usersLiked: userId },
        };
      }
    } else if (currentSauce.usersDisliked.includes(userId)) {
      if (req.body.like === 1) {
        update = {
          $inc: { dislike: -1 },
          $inc: { likes: 1 },
          $push: { usersLiked: userId },
          $pull: { usersDisliked: userId },
        };
      } else if (req.body.like === -1) {
        res.status(400).json({
          message: "You already disliked this sauce",
        });
      } else {
        update = {
          $inc: { dislikes: -1 },
          $pull: { usersDisliked: userId },
        };
      }
    } else {
      if (req.body.like === 1) {
        update = {
          $inc: { likes: 1 },
          $push: { usersLiked: userId },
        };
      } else if (req.body.like === -1) {
        update = {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: userId },
        };
      } else {
        return res.status(400).json({ message: "There was an error" });
      }
    }
    Sauce.updateOne({ _id: req.params.id }, update).then((sauce) => {
      console.log(sauce);
      res.status(200).json({ userId: sauce.userId, like: sauce.likes });
    });
  });
};
