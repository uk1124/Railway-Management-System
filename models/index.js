const sequelize = require("../config/database");
const User = require("./user");
const Train = require("./train");
const Booking = require("./booking");

// Define relationships
User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Train.hasMany(Booking, { foreignKey: "trainId" });
Booking.belongsTo(Train, { foreignKey: "trainId" });

sequelize
  .sync({ force: true }) // Use { force: true } only for development to reset the DB on each run
  .then(() => {
    console.log("Database & tables created!");
  });

module.exports = { User, Train, Booking };
