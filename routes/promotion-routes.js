const express = require('express');
const { check } = require('express-validator');

const promotionsController = require('../controllers/promotions-controller');

const router = express.Router();

router.get('/', promotionsController.getAllPromotion);

router.post(
    '/',
    [   
       check('promotionCode').not().isEmpty(),
       check('startDate').not().isEmpty().isDate(),
       check('endDate').not().isEmpty().isDate(),
    ],
    promotionsController.createPromotion
);

router.delete('/:promotionId', promotionsController.deletePromotionById);

router.patch(
   '/:promotionId',
   [
    check('promotionCode').not().isEmpty()
   ],
   promotionsController.updatePromotion
);

module.exports = router;