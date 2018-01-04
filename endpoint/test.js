var path = require('path')
var request = require('request');
var constants = require('../compoment/constants');

module.exports = function (req, resp, param, next) {
    var opendID = req.cookies.opendID
    resp.send(opendID)
}