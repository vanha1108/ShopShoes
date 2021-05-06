var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const connectDB = require('./models/Connection');

require('dotenv').config();
const fs = require('fs');

const bodyParser = require('body-parser'); 
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./middleware/passport');
const {PORT} = require('./config')

const brandRoutes  = require('./routes/brand-routes'); 
const userRoutes  = require('./routes/user-routes');
const categoryRoutes = require('./routes/category-routes');
const productRoutes = require('./routes/product-routes');
const groupRoutes = require('./routes/group-routes');
const sizeRoutes = require('./routes/size-routes');
const orderRoutes = require('./routes/order-routes');
const promotionRoutes = require('./routes/promotion-routes');
const importRoutes = require('./routes/import-routes');
const HttpError = require('./error-handle/http-error');

var app = express();

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/api/product', productRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/user', userRoutes);
app.use('/api/size', sizeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/promotion',promotionRoutes);
app.use('/api/import',importRoutes);
app.get('/sync', (req, res) =>{
    let models = require('./models');
    models.sequelize.sync()
    .then(() =>{
        res.send('Database sync completed!')
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
