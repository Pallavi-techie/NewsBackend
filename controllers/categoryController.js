const Category = require("../models/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
    console.log("GET /category: Fetching all categories");
  } catch (err) {
    console.error("Error in <API endpoint>:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
    console.log("POST /create/category: Request body:", req.body);
  } catch (err) {
    console.error("Error in <API endpoint>:", err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getCategories, createCategory };
