const req = require("express/lib/request");
const sauce = require("../models/sauce");
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
  const newSauce = req.body.sauce;
  sauce
    .findById({ _id: req.params.id, newSauce }, newSauce)
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
  sauce
    .findOne({ _id: req.params.id })
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
      sauce
        .deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(201).json({
            message: "Sauce deleted successfully",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
