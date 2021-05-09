const express = require('express');
const categoriesControllers = require('../controllers/categories-controllers');
const router = express.Router();

router.get('/',categoriesControllers.getAllCategory );

router.get('/:code', categoriesControllers.getCategoryByCode );

router.post('/', categoriesControllers.createCategory );

router.delete('/:code', categoriesControllers.deleteCategoryByCode);

router.patch('/:code', categoriesControllers.updateCategoryByCode);

module.exports = router;