var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    var openid = req.headers.cookie.opendID
    console.log('headers  ', req.headers);
    console.log('cookie ', req.headers.cookie);
    resp.send(openid)
}