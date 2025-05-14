const Category = require("../models/categoryModel");

const getCategories = (req, res) => {
  Category.getAllCategories((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

module.exports = { getCategories };