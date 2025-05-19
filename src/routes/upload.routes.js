const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');

// Upload routes
router.post('/image', authenticate, upload.single('image'), uploadController.uploadImage);
router.post('/images', authenticate, upload.array('images', 10), uploadController.uploadImages);
router.delete('/image/:filename', authenticate, uploadController.deleteImage);

module.exports = router;