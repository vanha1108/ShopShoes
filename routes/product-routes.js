const express = require('express');
const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/', productsControllers.getAllProduct);

router.get('/:code', productsControllers.getProductByCode);

router.post('/', productsControllers.createProduct );

router.post('/createProductSize', productsControllers.createProductSize);

router.patch('/:code', productsControllers.updateProductByCode );

module.exports = router;