const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');

// Public routes
router.get('/', carController.getAllCars);
router.get('/featured', carController.getFeaturedCars);
router.get('/brand/:brand', carController.getCarsByBrand);
router.get('/search', carController.searchCars);
router.get('/:id', carController.getCarById);

// Admin routes
router.post('/', authenticate, isAdmin, carController.createCar);
router.put('/:id', authenticate, isAdmin, carController.updateCar);
router.delete('/:id', authenticate, isAdmin, carController.deleteCar);
router.delete('/:id/images/:imageId', authenticate, isAdmin, carController.deleteCarImage);

module.exports = router;