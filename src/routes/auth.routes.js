const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// Thay đổi từ protect sang authenticate
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

module.exports = router;