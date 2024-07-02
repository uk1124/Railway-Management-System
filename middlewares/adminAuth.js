require("dotenv").config();

const adminAuth = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API key" });
  }
};

module.exports = adminAuth;
