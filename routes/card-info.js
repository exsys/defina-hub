const express = require("express");
const router = express.Router();
const Bottleneck = require("bottleneck/es5");

const Controller = require("../controllers/heroes");

const limiter = new Bottleneck({
    minTime: 250,
    maxConcurrent: 20
});

router.get("/", async (req, res, next) => {
    const result = await limiter.schedule(() => Controller.getCardInfo(req.body));
    res.status(result.status).json(result);
});

module.exports = router;