require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// Middleware: parse incoming JSON request bodies, allow requests from the frontend
app.use(express.json());
app.use(cors());

// Simple health check route to confirm the server is alive
app.get("/", (req, res) => {
  res.json({ message: "SoulTrack backend is running" });
});

const PORT = process.env.PORT || 5000;

// sync() creates the SQLite tables based on our models if they don't exist yet.
// We only need { force: true } the very first time or when resetting the DB —
// leaving it off preserves existing data on restart.

const errorHandler = require("./middleware/errorHandler");
// ... (keep your existing routes/middleware above this line)
app.use(errorHandler); // must be the LAST app.use()

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});