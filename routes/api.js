const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const {
  fetchLiveNews,
  getNewsByCategory,
  getTopNewsByCategory,
  createNews,
} = require("../controllers/newsController");

// Category routes
router.get("/category", getCategories);
router.post("/create/category", createCategory);

// News routes
router.get("/news/live/:category", fetchLiveNews); // New route for live news
router.get("/news/:category", getNewsByCategory);
router.get("/news/:category/10", getTopNewsByCategory);
router.post("/create/news", createNews);

module.exports = router;
