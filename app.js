const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middleware/corsMiddleware");
const taskRoutes = require("./routes/taskRouter");

const app = express();

app.use(corsMiddleware);
app.use(bodyParser.json());
app.use("/api", taskRoutes);

module.exports = app;
