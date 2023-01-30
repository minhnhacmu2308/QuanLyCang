const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const dotenv = require("dotenv");
const User = require("./routers/User.js");
// import Task from "./routers/Task.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.DATABASE_URL;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use(express.static("public"));
app.use("/admin", User);
// app.use("/user/task", Task);

app.listen(PORT, () => {
  console.log("Server running !!!!! ");
});
