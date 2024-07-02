const express = require("express");
const {
  addTrain,
  updateTrainSeats,
} = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const router = express.Router();

router.post("/addTrain", adminAuth, addTrain);
router.put("/updateTrainSeats", adminAuth, updateTrainSeats);

module.exports = router;
