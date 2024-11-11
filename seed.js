require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const seedUser = async () => {
  const email = "faizan@gmail.com";
  const plainPassword = "123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (error, results) => {
      if (error) {
        console.error("Error inserting user:", error);
      } else {
        console.log("User seeded:", results);
      }
      db.end();
    }
  );
};

seedUser();
