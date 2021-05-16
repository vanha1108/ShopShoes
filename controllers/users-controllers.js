const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const User = require('../models/user');
const Util = require('../utils/generateCode');

const brcypt = require('bcryptjs');
const { validationResult } = require('express-validator'); //lấy dc lỗi từ body validate
const {getToken} = require('../middleware/check-auth');

const getUser = async (req, res, next) => {
    let users;
    try{
        users = await User.find();
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any users', 500);
        return next(error);
    }

    if(!users)
    {
        const error =  new HttpError('Could not find any users', 404);
        return next(error);
    }
    res.status(200).json({users});
};

const getUserByCode = async (req, res, next) => {
    let users;
    const code = req.params.code
    try{
        users = await User.findOne({code});
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any users', 500);
        return next(error);
    }

    if(!users)
    {
        const error =  new HttpError('Could not find any users', 404);
        return next(error);
    }
    res.status(200).json({users});
}

const register = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const { fullName, email, password } = req.body;
    let userEmail;
    try{
    userEmail = await User.findOne({email: email });
    } catch (err) {
        const error = new HttpError('Signup Fail!. Pls try again', 500);
        return next(error);
    }
    if(userEmail)
    {
        const error =  new HttpError('Mail exists already, Pls use another mail', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await brcypt.hash(password, 9);
    } catch(err)
    {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
          );
          return next(error);
    }
    
    var code = Util.getCode();
    while(!User.findOne({code})) {
        code = Util.getCode();
    };

    const createdUser = {
        code,
        fullName,
        email,
        isAdmin: false,
        score: 0,
        password: hashedPassword
    };
    let Users;
    try {
        Users = await User.create(createdUser);
    } catch(err) {
        const error = new HttpError('Signing up failed, please try again later.',500);
        return next(error)
    } 
    res.status(200).json({
        email: createdUser.email, isAdmin: createdUser.isAdmin
    });
};

const login = async(req,res,next) => {
    const {email, password} = req.body;
    var existingUser;

    try{
        existingUser = await User.findOne({email: email });
    } catch (err) {
        const error = new HttpError('Login failed. Pls try again', 500);
        return next(error);
        
    }
    
    if(!existingUser) {
        const error = new HttpError('Email or Password is invalid', 401);
        return next(error);  
    }

    let isValidPassword;
    try {
        isValidPassword = await brcypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Something is error. Pls try again', 401);
        return next(error);
    }

    if(!isValidPassword){
        const error = new HttpError('Email or Password is invalid', 401);
        return next(error);
    }

    let token;
    try {
        token = getToken(existingUser);
    } catch (err) {
        const error = new HttpError('Login failed, please try again later.', 500);
        return next(error)
    }

    res.status(200).json({
        code: existingUser.code,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token: token
    });
}

const getMyUser = async (req, res, next) => {
    console.log("DAY");
    let users;
    try{
        users = await User.findOne({ email: req.userData.email});
    } catch (err) {
        const error = new HttpError('You are not log in. Pls login', 500);
        return next(error);
    }

    if(!users)
    {
        const error =  new HttpError('Could not find any users', 404);
        return next(error);
    }
    res.status(200).json({users});
};

const updateMyUser = async(req, res, next) => {
    let users;
    let userCurrent =  req.userData.email;

    try {
        users = await User.findOne({ email: userCurrent});
    } catch (err) {
        const error = new HttpError('You are not log in. Pls login', 500);
        return next(error);
    }

    if(!users)
    {
        const error =  new HttpError('Could not find any users', 404);
        return next(error);
    }

    users.fullName = req.body.fullName;
    users.phone = req.body.phone;
    users.address = req.body.address;
    users.gender = req.body.gender;
    users.birthday = req.body.birthday;
  
    try{
        userUpdate = await users,save();
    } catch (err) {
        const error = new HttpError('Update Fail', 500);
        return next(error);
    }
    res.status(200).json({userUpdate});
}

module.exports = {getUser, getMyUser,  register, login, updateMyUser, getUserByCode};