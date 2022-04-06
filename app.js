const express = require("express");
const helmet = require("helmet");
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
  // only use in development
  app.use(errorhandler());
}
module.exports = app;
