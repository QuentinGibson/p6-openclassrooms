const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const errorhandler = require("errorhandler");
const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauce");
const path = require("path");
const app = express();
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use("/api/sauce", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}
mongoose
  .connect(
    "mongodb+srv://headhuncho:9GoPPVKDOhs7s9Ol@cluster0.jgjzm.mongodb.net/piiquante?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });
module.exports = app;
