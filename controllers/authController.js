const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.render("login", { message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", { message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.render("login", { message: "Login successful! Token: " + token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).render("login", { message: "Server error" });
  }
};
