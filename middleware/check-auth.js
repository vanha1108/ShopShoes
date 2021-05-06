const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/index')
const HttpError = require('../error-handle/http-error');

const getToken = (user) => {
  return jwt.sign (
      {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      {
          expiresIn: '1h',
      }
  );
};

const isAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();  
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      const error =  new HttpError('invalid token', 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userData = {
      email: decodedToken.email,
      isAdmin: decodedToken.isAdmin
    };
    next();
  } catch (err) { 
    const error = new HttpError('Token is failed to create', 403);
    return next(error);
  }
};

const isAdmin = (req,res,next) => {
  if(req.userData && req.userData.isAdmin)
  {
    return next();
  }
  const error =  new HttpError('Token is not admin', 401);
  return next(error);
}
module.exports = {isAuth, isAdmin, getToken};
