const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { validateToken } = require("./func/CheckValidToken");
const { buyPlant } = require("./func/buyPlant");
const { farmPlant } = require("./func/farmPlant");
const { claimMission } = require("./func/ClaimMission");
const { upgradeAnimal } = require("./func/upgrade");
configDotenv();

farmPlant();
upgradeAnimal();
claimMission();
cron.schedule("*/12 * * * *", farmPlant);
cron.schedule("0 * * * *", claimMission);
cron.schedule("0 * * * *", upgradeAnimal);

// Start the server
const port = process.env.PORT || 103;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
