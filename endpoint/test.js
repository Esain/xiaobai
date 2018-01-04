var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    var openID = req.cookies.openID;
    resp.send(openID);
}