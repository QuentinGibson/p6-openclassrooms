const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const sauceController = require("../controllers/sauce");

const router = express.Router;

router.get("/", auth, sauceController.getAll);
router.get("/:id", auth, sauceController.getSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.post("/:id/like", auth, sauceController.rateSauce);
router.put("/:id", auth, multer, sauceController.updateSauce);
router.delete("/:id", auth, sauceController.deleteSauce);

module.exports = router;
