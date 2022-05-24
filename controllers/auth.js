const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      await User.findOne({ email: req.body.email }).then(async (_user) => {
        if (_user) {
          console.log(`User already exists`);
        } else {
          await user.save();
        }
      });
    })
    .then(() => {
      console.log("User created successfully");
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((error) => {
      console.log("Could not save new user: " + error);
      res.status(500).json({
        error: error,
      });
    });
};
exports.login = async (req, res, next) => {
  await User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log("Wrong password");
            res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          } else {
            const token = jwt.sign(
              { userId: user._id },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            );
            console.log(`Token session given out`);
            res.status(200).json({
              userId: user._id,
              token,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error,
          });
        });
    })
    .catch((error) => {
      console.log(`outer: ${error}`);
      res.status(500).json({
        error,
      });
    });
};
