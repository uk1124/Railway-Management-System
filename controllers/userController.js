const { Train, Booking, User } = require("../models");
const sequelize = require("../config/database");

exports.getSeatAvailability = async (req, res) => {
  const { source, destination } = req.body;
  try {
    const trains = await Train.findAll({
      where: {
        source,
        destination,
      },
    });
    res.status(200).json(trains);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching seat availability", error });
  }
};

exports.bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.userId;
  const transaction = await sequelize.transaction();
  try {
    const train = await Train.findByPk(trainId, { lock: true, transaction });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    if (train.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }
    train.availableSeats -= 1;
    await train.save({ transaction });

    const booking = await Booking.create(
      {
        userId,
        trainId,
        seatNumber: train.totalSeats - train.availableSeats,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({ message: "Seat booked successfully", booking });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error booking seat", error });
  }
};

exports.getBookingDetails = async (req, res) => {
  const userId = req.user.userId;
  try {
    const bookings = await Booking.findAll({
      where: {
        userId,
      },
      include: [Train],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking details", error });
  }
};
