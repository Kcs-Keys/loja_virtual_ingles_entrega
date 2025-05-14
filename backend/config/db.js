const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./loja_virtual.db", (err) => {
  if (err) return console.error("DB Connection Error:", err.message);
  console.log("Connected to SQLite database.");
});
module.exports = db;