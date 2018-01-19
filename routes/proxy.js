var express = require('express');
var router = express.Router();
var superagent = require('superagent');
/* GET users listing. */
router.get('/*', proxy);
router.post('/*', proxy);

function proxy(req, res, next) {
	console.log('proxy: ', req.url);
    res.setHeader('content-type', 'application/json;charset=UTF-8');

    var sreq = superagent.post("http://47.52.238.90:8079/baymin" + req.url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .accept('application/json')
        .send(req.body);
    sreq.on("error", function(res) {
        console.log("error");
    });
    sreq.on("end", function(res) {
        console.log("end");
    });
    sreq.pipe(res);
}

module.exports = router;