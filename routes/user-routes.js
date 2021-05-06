const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const usersControllers = require('../controllers/users-controllers');
const {isAdmin, isAuth} = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup',
[
    check('fullName').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
], 
usersControllers.register);

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ["profile", "email"] })
)

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {session: false}),
    usersControllers.loginGoogle
)

router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ["email"] })
)

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {session: false}),
    usersControllers.loginFacebook
)

router.post('/login', usersControllers.login);  
router.get('/confirmation/:token', usersControllers.getConfirmation);

router.use(isAuth);

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

