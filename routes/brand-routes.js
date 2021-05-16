const express = require('express');
const brandsControllers = require('../controllers/brands-controllers');
const router = express.Router();


router.get('/', brandsControllers.getAllBrand );

router.post( '/', brandsControllers.createBrand );

router.get('/:code', brandsControllers.getBrandByCode);

router.delete('/:code', brandsControllers.deleteBrandByCode);

router.patch('/:code', brandsControllers.updateBrandByCode );

module.exports = router;