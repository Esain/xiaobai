var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    if (!param.code && !param.state)
        resp.redirect(constants.AUTH_URL)
    else{
        var code = param.code;
        request
            .get(constants.getAuthAccessUrl(code), function (error, response, body) {
                if(error){

                }else{
                    console.log(body);
                    if (body.errcode) {
                        console.error(`获取token失败${response.errcode} ---- ${response.errmsg}`);
                        var error = new Error('获取token失败')
                        next(error);
                    } else {
                        resp.cookie('openID', body.openid);
                        resp.redirect('/');
                    }
                }
            })
          
    }
}