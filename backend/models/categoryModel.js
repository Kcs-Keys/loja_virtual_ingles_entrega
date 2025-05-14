const db = require("../config/db");

const getAllCategories = (callback) => {
  db.all("SELECT * FROM categories", callback);
};

module.exports = { getAllCategories };