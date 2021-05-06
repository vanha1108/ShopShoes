const express = require('express');
const { check } = require('express-validator');
const importsControllers = require('../controllers/imports-controller');
const {isAdmin, isAuth} = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

router.post(
    '/addImport',
    fileUpload.single('imagePath'),
    [   
        check('importCode').not().isEmpty(),
        check('publisherName').not().isEmpty()
    ],
    importsControllers.addImport
);

router.post(
    '/addImportDetail',
    fileUpload.single('imagePath'),
    importsControllers.addImportDetail 
);

router.get('/',importsControllers.getAllImport);

router.get('/:productId',importsControllers.getImportByProductId)
module.exports = router;