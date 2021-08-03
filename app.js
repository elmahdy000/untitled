var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const productsRoute = require('./routes/products');
const usersRouter = require('./routes/users');
const orderRoute = require('./routes/orders');





var app = express();
app.use(cors({
    origin:'*',
    methods :['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders : 'content-type,Authorization,origin,X-Requested-With,Accept'
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products',productsRoute);
app.use('/api/users',usersRouter);
app.use('/api/orders',orderRoute);
module.exports = app;
