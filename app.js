require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");

const allRoutes = require("./routes/all-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware for express
app.use(compression());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("frontend"));
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use("/", allRoutes);

// always send back the index.html since angular requires this.
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Backend listening on localhost: ${PORT}`);
});