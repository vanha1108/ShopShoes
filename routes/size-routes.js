const express = require('express');
const { check } = require('express-validator');

const sizesControllers = require('../controllers/sizes-controller');

const router = express.Router();

router.get('/', sizesControllers.getAllSize);
router.get('/getSizeByType/:sizeTypeName',sizesControllers.getAllSizeByType)

router.post(
    '/',
    [   
       check('sizeName').not().isEmpty()
    ],
    sizesControllers.createSize
);

router.delete('/:sizedId', sizesControllers.deleteSizeById);

router.patch(
   '/:sizeId',
   [
      check('name').not().isEmpty()
   ],
   sizesControllers.updateSize
);

module.exports = router;