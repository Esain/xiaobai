var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: true
})

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.post('/*', urlencodedParser, function (req, res) {
    console.log("-------post请求-------");
    res.set({
        "host": "http://47.52.238.90:8079" + req.url
    })
    console.log(res.get("host"))
    console.log(req.body);
    res.send(req.body);
})

var server = app.listen(80, function () {
    var port = server.address().port
    console.log("服务器端口：" + port)
})



// var PORT = 8080;

// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// var mine = require('./mine').types;
// var path = require('path');
// var httpProxy = require('http-proxy');

// var proxy = httpProxy.createProxyServer({
//     target: 'http://47.52.238.90:8079/',   //接口地址
//     // 下面的设置用于https
//     // ssl: {
//     //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
//     //     cert: fs.readFileSync('server.crt', 'utf8')
//     // },
//     // secure: false
// });

// proxy.on('error', function (err, req, res) {
//     res.writeHead(500, {
//         'content-type': 'text/plain'
//     });
//     console.log(err);
//     res.end('Something went wrong. And we are reporting a custom error message.');
// });

// var server = http.createServer(function (request, response) {
//     var pathname = url.parse(request.url).pathname;
//     //var realPath = path.join("main-pages", pathname); // 指定根目录
//     var realPath = path.join("./", pathname);
//     console.log(pathname);
//     console.log(realPath);
//     var ext = path.extname(realPath);
//     ext = ext ? ext.slice(1) : 'unknown';

//     //判断如果是接口访问，则通过proxy转发
//     if (pathname.indexOf("mspj-mall-admin") > 0) {
//         proxy.web(request, response);
//         return;
//     }

//     fs.exists(realPath, function (exists) {
//         if (!exists) {
//             response.writeHead(404, {
//                 'Content-Type': 'text/plain'
//             });

//             response.write("This request URL " + pathname + " was not found on this server.");
//             response.end();
//         } else {
//             fs.readFile(realPath, "binary", function (err, file) {
//                 if (err) {
//                     response.writeHead(500, {
//                         'Content-Type': 'text/plain'
//                     });
//                     response.end(err);
//                 } else {
//                     var contentType = mine[ext] || "text/plain";
//                     response.writeHead(200, {
//                         'Content-Type': contentType
//                     });
//                     response.write(file, "binary");
//                     response.end();
//                 }
//             });
//         }
//     });
// });
// server.listen(PORT);
// console.log("Server runing at port: " + PORT + ".");


