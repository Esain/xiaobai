var request = require("request");
var menuJson = require("../compoment/jsonData/menu.json");
var weixinUtil = require("../compoment/weixinUtil.js");
var constants = require("../compoment/constants.js");

var init_menu = function(req,resp,param){
	weixinUtil.getToken(function(token){
		var url = constants.MENU_URL+token;
		console.info(url);
		request({method:"POST",url:url,body:menuJson,json:true},function(err,response,body){
			if(err){
				return console.info(err);
			}
			resp.json(body);
		})
	});	
}
module.exports = init_menu;
