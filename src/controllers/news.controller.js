const News = require("../models/news.model");
const AppError = require("../utils/error");
const fs = require("fs");
const path = require("path");

// Get all news with pagination
exports.getAllNews = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const news = await News.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await News.countDocuments();

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

// Get featured news
exports.getFeaturedNews = async (req, res, next) => {
  try {
    const news = await News.find({ featured: true }).limit(6);

    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

// Get news by ID
exports.getNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return next(new AppError("Không tìm thấy tin tức", 404));
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

// Create new news (admin only)
exports.createNews = async (req, res, next) => {
  try {
    const { title, content, author, tags, featured, image } = req.body;

    // Handle tags as array
    const parsedTags = typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : tags;

    // Handle image - Chấp nhận URL thay vì file upload
    const imageObj = image
      ? {
          url: image,
          filename: image.split('/').pop(),
        }
      : null;

    const news = await News.create({
      title,
      content,
      author,
      tags: parsedTags,
      featured: featured === "true",
      image: imageObj,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

// Update news (admin only)
exports.updateNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return next(new AppError("Không tìm thấy tin tức", 404));
    }

    // Handle tags as array
    if (req.body.tags) {
      req.body.tags =
        typeof req.body.tags === "string" ? req.body.tags.split(",").map((tag) => tag.trim()) : req.body.tags;
    }

    // Handle featured as boolean
    if (req.body.featured) {
      req.body.featured = req.body.featured === "true";
    }

    // Handle new image
    if (req.body.image) {
      req.body.image = {
        url: req.body.image,
        filename: req.body.image.split('/').pop(),
      };
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      data: updatedNews,
    });
  } catch (error) {
    next(error);
  }
};

// Delete news (admin only)
exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return next(new AppError("Không tìm thấy tin tức", 404));
    }

    await News.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tin tức đã được xóa thành công",
    });
  } catch (error) {
    next(error);
  }
};

// Get news by tag
exports.getNewsByTag = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const news = await News.find({ tags: req.params.tag }).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await News.countDocuments({ tags: req.params.tag });

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

// Search news
exports.searchNews = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = req.query.q;

    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    };

    const news = await News.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await News.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};
