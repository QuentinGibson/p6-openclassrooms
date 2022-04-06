const express = require("express");
const helmet = require("helmet");
const errorhandler = require("errorhandler");
const path = require("path");
const app = express();
app.use(helmet());
app.use("/images", express.static(path.join(__dirname, "images")));
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}
module.exports = app;
