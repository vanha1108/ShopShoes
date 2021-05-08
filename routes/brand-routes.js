const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const brandsControllers = require('../controllers/brands-controllers');
const router = express.Router();


router.get('/', brandsControllers.getAllBrand );


router.post(
    '/',
    fileUpload.single('imagePath'),
    [   
       check('name').not().isEmpty()
    ],
    brandsControllers.createBrand
 );
router.get('/:brandId', brandsControllers.getBrandById);
router.delete('/:brandId', brandsControllers.deleteBrandById);
router.patch(
   '/:brandId',
   fileUpload.single('imagePath'),
   [
      check('name').not().isEmpty()
   ],
   brandsControllers.updateBrandById
);

module.exports = router;