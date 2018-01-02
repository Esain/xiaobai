var weixinUtil = require("../compoment/weixinUtil.js");
var env = require("../compoment/env.js");
var shortId = require("shortid");
var crypto = require("crypto");

var get_signature = function(req,resp,param,next){
	var url = param.url;
	weixinUtil.getTicket(function(ticket){
		var noncestr = shortId.generate();
		var timestamp = parseInt((new Date().getTime())/1000);
		var signStr ="jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
		var signature = crypto.createHash("sha1").update(signStr).digest("hex");
		var ret = {};
		ret.appId = env.WEI_XIN_APP_ID;
		ret.signature = signature;
		ret.noncestr = noncestr;
		ret.timestamp = timestamp;
		resp.json(ret);
	});
}
module.exports = get_signature;