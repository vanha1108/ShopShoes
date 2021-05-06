const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const groupsController = require('../controllers/groups-controllers');

const router = express.Router();

router.get('/', groupsController.getAllGroup );


router.get('/getAlias/:alias', groupsController.getGroupByAlias);
router.get('/:groupId', groupsController.getGroupById);

router.post(
    '/',
    fileUpload.single('imagePath'),
    [   
       check('name').not().isEmpty()
    ],
    groupsController.createGroup
 );

router.delete('/:groupId', groupsController.deleteGroupById);



module.exports = router;