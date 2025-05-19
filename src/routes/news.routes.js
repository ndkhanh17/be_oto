const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', newsController.getAllNews);
router.get('/featured', newsController.getFeaturedNews);
router.get('/:id', newsController.getNewsById);

// Admin routes
router.post('/', authenticate, isAdmin, newsController.createNews);
router.put('/:id', authenticate, isAdmin, newsController.updateNews);
router.delete('/:id', authenticate, isAdmin, newsController.deleteNews);

module.exports = router;