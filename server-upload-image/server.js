const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RouterIndex = require("./routers/index.js")
const app = express();
const PORT = process.env.PORT || 6000;
const URI = process.env.DATABASE_URL;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use(express.static("public"));
app.use("/user", RouterIndex);

app.listen(PORT, () => {
    console.log("Server running !!!!! ");});