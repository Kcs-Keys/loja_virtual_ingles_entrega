const db = require("../config/db");

const getAllProducts = (callback) => {
  db.all("SELECT * FROM products", callback);
};

module.exports = { getAllProducts };