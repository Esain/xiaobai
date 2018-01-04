var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    if (req.headers.cookie && req.headers.cookie.openID){
        resp.redirect("/");
    }else if(!param.code && !param.state){
        resp.redirect(constants.AUTH_URL);
    }else{
        var code = param.code;
        request
            .get(constants.getAuthAccessUrl(code), function (error, response, body) {
                if(error){

                }else{
                    var reqObj = JSON.parse(body)
                    if (reqObj.errcode) {
                        console.error(`获取token失败${reqObj.errcode} ---- ${reqObj.errmsg}`);
                        var error = new Error('获取token失败')
                        next(error);
                    } else {
                        resp.cookie('openID', reqObj.openid, { maxAge: (Date.now()/1000).toFixed(0) + 72000 });
                        resp.redirect('/');
                    }
                }
            })
          
    }
}