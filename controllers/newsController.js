const axios = require("axios");
const News = require("../models/News");

// Fetch live news from NewsAPI by category
const fetchLiveNews = async (req, res) => {
  try {
    const { category } = req.params;

    // API Endpoint
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

    // Fetch news
    const response = await axios.get(url);

    // Return news articles
    if (response.data.articles.length > 0) {
      res.json(response.data.articles);
      console.log(
        `GET /news/live/:category: Fetching live news for category - ${req.params.category}`
      );
    } else {
      res.status(404).json({ message: "No news found for this category." });
    }
  } catch (err) {
    console.error("Error in <API endpoint>:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get news by category
const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await News.find({ category });
    res.json(news);
    console.log(
      `GET /news/:category: Fetching all news for category - ${req.params.category}`
    );
  } catch (err) {
    console.error("Error in <API endpoint>:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get top 10 news by category
const getTopNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await News.find({ category }).limit(10);
    res.json(news);
    console.log(
      `GET /news/:category/10: Fetching top 10 news for category - ${req.params.category}`
    );
  } catch (err) {
    console.error("Error in <API endpoint>:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create news
const createNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const news = new News({ title, description, category });
    await news.save();
    res.status(201).json(news);
    console.log("POST /create/news: Request body:", req.body);
  } catch (err) {
    console.error("Error in <API endpoint>:", err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  fetchLiveNews,
  getNewsByCategory,
  getTopNewsByCategory,
  createNews,
};
