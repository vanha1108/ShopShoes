const express = require('express');
const usersControllers = require('../controllers/users-controllers');
const {isAdmin, isAuth} = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup', usersControllers.register);

router.post('/login', usersControllers.login);  

router.use(isAuth);

router.get('/myaccount', usersControllers.getMyUser);

router.patch('/myaccount', usersControllers.updateMyUser);

router.use(isAdmin);

router.get('/', usersControllers.getUser);

router.get('/:code', usersControllers.getUserByCode);









module.exports = router;

