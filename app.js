var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var couponRouter = require('./routes/coupon');
var productRouter = require('./routes/product');
var portfolioRouter = require('./routes/portfolio');
var orderRouter = require('./routes/order');


const cors = require('cors');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoryRouter);
app.use('/coupons', couponRouter);
app.use('/products', productRouter);
app.use('/portfolios', portfolioRouter);
app.use('/orders', orderRouter);

module.exports = app;
