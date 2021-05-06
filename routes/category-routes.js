const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const categoriesControllers = require('../controllers/categories-controllers');
const router = express.Router();

router.get('/',categoriesControllers.getAllCategory );
router.get('/getAlias/:alias', categoriesControllers.getCategoryByAlias);



router.get('/:cateId', categoriesControllers.getCategoryById);
router.post(
    '/',
    fileUpload.single('imagePath'),
    [   
       check('name').not().isEmpty(),
       check('groupId').not().isEmpty()
    ],
    categoriesControllers.createCategory
 );
router.delete('/:cateId', categoriesControllers.deleteCategoryById);
router.patch(
   '/:cateId',
   fileUpload.single('imagePath'),
   categoriesControllers.updateCategoryById
);

module.exports = router;