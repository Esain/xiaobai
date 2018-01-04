var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    request
        .get(constants.AUTH_URL)
        .on('error', function (err) {
            console.error('授权中错误')
        })
        .on('response', function (response) {
            console.log('授权中');
        })
        .on('end', function () {
            console.log('授权中结束')
        })
        .pipe(resp)
}