const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/database");
const { User, Train, Booking } = require("./models");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Add a simple root route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

console.log("Initializing Sequelize connection...");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ force: false }); // Use force: false to avoid dropping tables
  })
  .then(() => {
    console.log("Database sync complete.");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit the process with a failure code
  });

// console.log("Environment Variables:");
// console.log("PORT:", process.env.PORT);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
// console.log("ADMIN_API_KEY:", process.env.ADMIN_API_KEY);
