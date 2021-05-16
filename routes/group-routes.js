const express = require('express');
const groupsController = require('../controllers/groups-controllers');
const router = express.Router();

router.get('/', groupsController.getAllGroup );

router.get('/:code', groupsController.getGroupByCode);

router.post('/', groupsController.createGroup );

router.delete('/:code', groupsController.deleteGroupByCode);
router.patch('/:code', groupsController.updateGroupByCode);

module.exports = router;