const sequelize = require("../config/database");
const User = require("./user");
const Train = require("./train");
const Booking = require("./booking");

// Relationships
User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Train.hasMany(Booking, { foreignKey: "trainId" });
Booking.belongsTo(Train, { foreignKey: "trainId" });

module.exports = { User, Train, Booking };
