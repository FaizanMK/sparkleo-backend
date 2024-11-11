const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const port = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("This is a home route");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
