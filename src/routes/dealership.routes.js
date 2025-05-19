const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealership.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', dealershipController.getAllDealerships);
router.get('/:id', dealershipController.getDealershipById);

// Admin routes
router.post('/', authenticate, isAdmin, dealershipController.createDealership);
router.put('/:id', authenticate, isAdmin, dealershipController.updateDealership);
router.delete('/:id', authenticate, isAdmin, dealershipController.deleteDealership);

module.exports = router;