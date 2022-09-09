const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const userRoutes = require("./routes/user.routes")
const eventRoutes = require("./routes/event.routes");

const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get("/", (req, res) => res.send(""));

app.use("/api/user", userRoutes)
app.use("/api/event", eventRoutes)

const port = process.env.PORT;
app.listen(port, () => console.log(`Port : ${port}`));
