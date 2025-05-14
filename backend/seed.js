const db = require("./config/db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS categories");
  db.run("DROP TABLE IF EXISTS products");

  db.run(\`
    CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  \`);

  db.run(\`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  \`);

  const insertCategory = db.prepare("INSERT INTO categories (name) VALUES (?)");
  ["Books", "Courses", "Tools"].forEach(name => insertCategory.run(name));
  insertCategory.finalize();

  const insertProduct = db.prepare("INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)");
  insertProduct.run("English Grammar", "Comprehensive guide to English grammar.", 29.99, 1);
  insertProduct.run("Speaking Course", "Fluency practice for conversation.", 59.99, 2);
  insertProduct.run("Flashcards Pack", "Vocabulary flashcards.", 19.99, 3);
  insertProduct.finalize();

  console.log("Database seeded!");
});