var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var routes = require('./routes/index.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session 中间件
app.use(session({
  name: 'bobo',// 设置 cookie 中保存 session id 的字段名称
  secret: 'bobo',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: 2592000000// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: 'mongodb://root:Kongxi521@dds-2ze41b282c55fcc41.mongodb.rds.aliyuncs.com:3717,dds-2ze41b282c55fcc42.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-2482227'
    // url: 'mongodb://localhost:27017/bobo'// mongodb 地址
  })
}));
// flash 中间价，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
//   keepExtensions: true// 保留后缀
// }));

//
// app.get('/',function(req,res){
//   res.redirect('/callback');
// })
//
// app.get('/callback', function(req,res){
//   res.render('index')
// })
//
// app.post('/callback',function(req,res){
//   console.log(req.body);
//   return res.redirect('/home');
// })

routes(app)


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   return res.render('error');
// });

module.exports = app;
