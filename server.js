var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/*', urlencodedParser, function (req, res) {
    console.log("-------post请求-------");
    res.setHeader('content-type', 'application/json;charset=UTF-8');
    var superagent = require('superagent');
    var sreq = superagent.post("http://47.52.238.90:8079" + req.url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .accept('application/json')
        .send(req.body);
    sreq.on("error", function (res) {
        console.log("error");
    });
    sreq.on("end",function(res){
        console.log("end");
    });
    sreq.pipe(res);
})

var server = app.listen(80, function () {
    var port = server.address().port
    console.log("服务器监听端口：" + port)
})
