var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    if (!req.param.code && !req.param.state)
        resp.redirect(constants.AUTH_URL)
    else{
        var code = param.code;
        request
            .get(constants.getAuthAccessUrl(code))
            .on('error', function (err) {
                console.error('')
            })
            .on('response', function (response) {
                if (response.errcode) {
                    console.error(`获取token失败${response.errcode} ---- ${response.errmsg}`);
                    var error = new Error('获取token失败')
                    next(error);
                } else {
                    req.session.openID = response.openid;
                }
                resp.redirect('/');
            })
            .on('end', function () {
                console.log('获取token结束')
            })
    }
}