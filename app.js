const express = require("express");
const helmet = require("helmet");
const errorhandler = require("errorhandler");
const app = express();
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}
module.exports = app;
