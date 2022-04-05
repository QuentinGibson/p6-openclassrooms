const express = require("express");
const router = express.Router;
const auth = require("../middleware/auth");
const sauceController = require("../controllers/sauce");
const multer = require("multer");

router.get("/", auth, sauceController.getAll);
router.get("/:id", auth, sauceController.getSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.post("/:id/like", auth, sauceController.rateSauce);
router.put("/:id", auth, multer, sauceController.updateSauce);
router.delete("/:id", auth, sauceController.deleteSauce);

module.exports = router;
