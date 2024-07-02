const { Train } = require("../models");

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await Train.create({
      name,
      source,
      destination,
      totalSeats,
      availableSeats: totalSeats,
    });
    res.status(201).json({ message: "Train added successfully", train });
  } catch (error) {
    res.status(500).json({ message: "Error adding train", error });
  }
};

exports.updateTrainSeats = async (req, res) => {
  const { trainId, totalSeats } = req.body;
  try {
    const train = await Train.findByPk(trainId);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    train.totalSeats = totalSeats;
    train.availableSeats = totalSeats; // Optional: Reset available seats
    await train.save();
    res
      .status(200)
      .json({ message: "Train seats updated successfully", train });
  } catch (error) {
    res.status(500).json({ message: "Error updating train seats", error });
  }
};
