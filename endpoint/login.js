var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');
var codeMap = {}
module.exports = function (req, resp, param, next) {
    if (req.cookies && req.cookies.openID){
        console.log('cookie opendID: ',req.cookies.openID)
        resp.redirect("/");
    }else if(!param.code && !param.state){
        resp.redirect(constants.AUTH_URL);
    }else{
        var code = param.code;
        if (codeMap[code] && codeMap[code] !='empty'){
            console.log('codeMap opendID: ', codeMap[code])
            resp.cookie('openID', codeMap[code], { maxAge: Date.now() + 72000000 });
            resp.redirect('/');
        }else{
            console.log('----------  getAuthAccessUrl code: ' + code +' -----------------------------------');
            if(codeMap[code]){
                console.log('----------  getAuthAccessUrl code has been userd -----------------------------------');
                return;
            }
            codeMap[code] = 'empty'; 
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
                            console.log('remote opendID: ', reqObj.openid)
                            codeMap[code] = reqObj.openid;
                            resp.cookie('openID', reqObj.openid, { maxAge: Date.now() + 72000000 });
                            resp.redirect('/');
                        }
                    }
                })
        }
          
    }
}