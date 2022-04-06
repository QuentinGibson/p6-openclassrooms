const express = require("express");
const multer = require("multer");
const { createSauce } = require("../controllers/sauceController/createSauce");
const { deleteSauce } = require("../controllers/sauceController/deleteSauce");
const { getAllSauces } = require("../controllers/sauceController/getAllSauces");
const { getSauce } = require("../controllers/sauceController/getSauce");
const { updateSauce } = require("../controllers/sauceController/updateSauce");
const auth = require("../middleware/auth");

const router = express.Router;

router.get("/", auth, getAllSauces);
router.get("/:id", auth, getSauce);
router.post("/", auth, multer, createSauce);
router.post("/:id/likes", auth, updateSauce);
router.put("/:id", auth, multer, updateSauce);
router.delete("/:id", auth, deleteSauce);

module.exports = router;
