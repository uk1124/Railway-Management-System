const express = require("express");
const {
  getSeatAvailability,
  bookSeat,
  getBookingDetails,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");
const router = express.Router();

router.post("/getSeatAvailability", userAuth, getSeatAvailability);
router.post("/bookSeat", userAuth, bookSeat);
router.get("/getBookingDetails", userAuth, getBookingDetails);

module.exports = router;
