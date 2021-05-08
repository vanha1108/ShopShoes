const express = require('express');
const fileUpload = require('../middleware/file-upload');
const passport = require('passport');
const usersControllers = require('../controllers/users-controllers');
const {isAdmin, isAuth} = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup', usersControllers.register);

router.post('/login', usersControllers.login);  

router.get('/myaccount', usersControllers.getMyUser);
router.patch(
'/myaccount',
fileUpload.single('avatarPath'),
usersControllers.updateMyUser);

router.use(isAdmin);

router.get('/',usersControllers.getUser);
router.get('/:uid', usersControllers.getUserById);
router.patch('/lock/:uid', usersControllers.lockUser);









module.exports = router;

