var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const verify = require('./middleware/verifyJWT')
var indexRouter = require('./route/film');
var usersRouter = require('./route/register');
// 加载home页的json数据
const homeRouter = require('./route/data_home')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //express.static 静态资源托管

// app.use(verify)// 验证token，调试阶段暂时不验证token
app.use('/', indexRouter); //电影列表路径
app.use('/user', usersRouter); //用户登录注册路径
app.use('/data', homeRouter) //首页数据
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
