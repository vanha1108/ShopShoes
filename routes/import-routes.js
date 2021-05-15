const express = require('express');
const importsControllers = require('../controllers/imports-controller');

const router = express.Router();

router.post('/addImport', importsControllers.addImport );

router.post('/addImportDetail', importsControllers.addImportDetail );

router.get('/',importsControllers.getAllImport);

router.get('/:importCode',importsControllers.getImportDetailByImportCode);

module.exports = router;