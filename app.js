const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
var cors = require("cors");
const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauce");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.mongo_atlas)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });
const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

module.exports = app;
