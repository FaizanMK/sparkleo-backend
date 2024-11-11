const db = require("../config/db");

const User = {
  findByEmail: async (email) => {
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  },
  create: async (email, hashedPassword) => {
    const [result] = await db.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    return result;
  },
};

module.exports = User;
