const Product = require("../models/productModel");

const getProducts = (req, res) => {
  Product.getAllProducts((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

module.exports = { getProducts };