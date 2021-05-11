const express = require('express');
const promotionsController = require('../controllers/promotions-controller');

const router = express.Router();

router.get('/', promotionsController.getAllPromotion);

router.post('/',promotionsController.createPromotion );

router.delete('/:code', promotionsController.deletePromotionByCode);

router.patch('/:promotionId', promotionsController.updatePromotion);

module.exports = router;