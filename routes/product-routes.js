const express = require('express');
const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/', productsControllers.getAllProduct);
router.get('/productSize', productsControllers.getAllProductSize);
router.get('/productSize/size/:productCode', productsControllers.getProductSizeByProductCode);

router.get('/:code', productsControllers.getProductByCode);

router.post('/', productsControllers.createProduct );

router.post('/createProductSize', productsControllers.createProductSize);

router.patch('/:code', productsControllers.updateProductByCode );

router.delete('/:code', productsControllers.deleteProductByCode);

router.get('/productSize/:productCode', productsControllers.ProductSizeByProductCode);

module.exports = router;