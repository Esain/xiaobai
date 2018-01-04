//根据code获取授权access_token
var constants = require('../compoment/constants');
var request = require("request");
var redisUril = require("../compoment/redisUtil");

module.exports = function (req, resp, param, next) {
    var code = param.code;
    request
        .get(constants.getAuthAccessUrl(code))
        .on('error', function (err) {
            console.error('')
        })
        .on('response', function (response) {
            if (response.errcode) {
                console.error(`获取token失败${response.errcode} ---- ${response.errmsg}`);
                req.send('error')
            } else {
                req.session.openID = response.openid;
            }
            req.redirect('/');
        })
        .on('end', function () {
            console.log('获取token结束')
        })
        
    
}