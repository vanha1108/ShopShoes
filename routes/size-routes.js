const express = require('express');
const sizesControllers = require('../controllers/sizes-controller');

const router = express.Router();

router.get('/', sizesControllers.getAllSize);

router.get('/getSizeByType/:sizeType',sizesControllers.getAllSizeByType)

router.post('/', sizesControllers.createSize);

router.delete('/:code', sizesControllers.deleteSizeByCode);

router.patch('/:code',sizesControllers.updateSize);

module.exports = router;