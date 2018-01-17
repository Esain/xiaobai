var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var socketUtil = require(path.join(process.cwd(),'compoment/socketUtil.js'));

// var routes = require('./routes/index');
// var users = require('./routes/users');
global.myUtil = require('./compoment/util.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'xiaobai',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//app.use('/', routes);
//app.use('/users', users);
registerRouteByDir(function (path, handler) {
  console.log(path)
  app.get(path, wrap(handler));
  app.post(path, wrap(handler));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});

app.get('/auth/:id/:password', function (req, res) {
  res.send({ id: req.params.id, name: req.params.password });
});

app.listen(8079);
console.log('Listening on port 8079...');



function registerRouteByDir(register) {
  myUtil.listFile(process.cwd() + '/endpoint', function (file, fPath) {
    var relative = path.relative(process.cwd() + "/endpoint/", path.join(fPath, file));
    var reqPath = '/' + relative.substr(0, relative.lastIndexOf('.js'));
    var handler = require(path.join(fPath, file));
    //对于handler中每个
    if (typeof handler === 'function') {//一个对象包含了暴露的方法
      register(reqPath, handler);
    } else {
      for (var method in handler) {
        if (typeof handler[method] === 'function') {
          register(reqPath + '/' + method, handler[method]);
        }
      }
    }
  })
};
//统一GET/POST的参数
//f的签名为 f(paramObj, res)
function wrap(f) {
  return function (req, resp, next) {
    var query = req.query;
    var body = req.body;
    var params = req.params;
    //还是要将req传进来
    f(req, resp, myUtil.mergeJson(query, body, params), next);
  }
}




module.exports = app;
