const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
MongoDB.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/health", require("./routes/health"));
app.use("/api/user", require("./routes/user"))
app.use("/api/order", require("./routes/order"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
