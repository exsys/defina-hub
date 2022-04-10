const express = require("express");
const router = express.Router();

const Controller = require("../controllers/suggestions");

router.post("/", async (req, res, next) => {
    const result = await Controller.sendSuggestion(req.body);
    res.status(result.status).json(result);
});

module.exports = router;