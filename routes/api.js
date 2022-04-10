const express = require("express");
const router = express.Router();

const suggestionRoute = require("./suggestion");
const cardinfoRoute = require("./card-info");

// ROOT: definahub.com/api/

router
    .use("/suggestion", suggestionRoute)
    .use("/cardinfo", cardinfoRoute);

module.exports = router;