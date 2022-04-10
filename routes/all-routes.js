const express = require("express");
const router = express.Router();

// official API routes
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

module.exports = router;