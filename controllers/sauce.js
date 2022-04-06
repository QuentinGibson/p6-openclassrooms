const Sauce = require("../models/sauce");

exports.getAll = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json({ sauces });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.getSauce = (req, res, next) => {
  Sauce.findById(req.body.id)
    .then((sauce) => {
      res.status(200).json({ sauce });
    })
    .catch((error) => {
      error;
    });
};

exports.createSauce = (req, res, next) => {
  let sauce;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const { name, manufacturer, description, mainPepper, heat } = JSON.parse(
      req.body.sauce
    );

    sauce = new Sauce({
      name,
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

exports.updateSauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
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
