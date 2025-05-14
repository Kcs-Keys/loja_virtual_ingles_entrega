const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const db = require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});