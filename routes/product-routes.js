const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/', productsControllers.getAllProduct);
router.get('/:productId', productsControllers.getProductById);
router.get('/getAlias/:productAlias', productsControllers.getProductByAlias);
router.get('/getImageByProductId/:productId', productsControllers.getProductImageByProductId);

router.post(
   '/',
   fileUpload.single('imagePath'),
   [
      check('name').not().isEmpty()
   ],
   productsControllers.createProduct
);

router.post('/createProductSize',
   fileUpload.single('imagePath'),
   productsControllers.createProductSize);


router.post(
   '/createProductImage',
   fileUpload.single('imagePath'),
   productsControllers.createProductImage);


router.patch(
   '/updateProductImage/:productImageId',
   fileUpload.single('imagePath'),
   productsControllers.updateProductImage);


router.patch(
   '/:productId',
   fileUpload.single('imagePath'),
   productsControllers.updateProductById);

router.delete(
   '/deleteProductImage/:productImageId',
   productsControllers.deleteProductImage
);

module.exports = router;