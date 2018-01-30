var request = require("request");
var path = require("path");
var fs = require("fs");
var constants = require("../compoment/constants.js");
var util = require("../compoment/util.js");

var token = "";
var tokenPrevTime = 0;
var ticket = "";
var ticketPrevTime =0;

var getToken = function(cb){
	if(checkTime(tokenPrevTime,"token")){
		request(constants.ACCESS_URL,function(error,response,body){
			if (!error && response.statusCode == 200) {
				body = JSON.parse(body);
			    token = body.access_token;
			    console.log(token);
			    cb(null,token);
			  }else{
			  	console.error("get token error");
			  	cb("get token error",token);
			  }
			});
	}else{
		cb(null,token);
	}
}

var getTokenPromise = util.toPromise(getToken,null);

var getTicket = function(cb){
	if(checkTime(ticketPrevTime,"ticket")){
		getToken(function(token){
			var ticketUrl = constants.TICKET_URL + "&access_token=" + token;
			request(ticketUrl,function(error,response,body){
				if (!error && response.statusCode == 200) {
					body = JSON.parse(body);
					ticket = body.ticket;
					cb(ticket);
				  }else{
				  	console.error("get ticket error");
				  }
			})		
		});
	}else{
		cb(ticket);
	}
	
}

var checkTime = function(time,flag){
	var nowTime = parseInt((new Date().getTime())/1000);
	if(nowTime > time + 3600|| time == 0){
		if(flag=="token"){
			tokenPrevTime = nowTime;
		}else{
			ticketPrevTime = nowTime;
		}
		return true;
	}else{
		return false;
	}
}

var getUserInfo = function (userId,cb){
	getToken(function (err,token){
		var url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='+token+'&openid='+userId+'&lang=zh_CN';
		request(url,function(error,response,body){
			if (!error && response.statusCode == 200) {
				body = JSON.parse(body);
				cb(body);
			  }else{
			  	console.error("get ticket error");
			  }
		})		
	})
}

var getMedia = function (mediaId,cb){
	getToken(function (err,token){
		var url = constants.GET_MEDIA + token + '&media_id=' + mediaId;
		var filePath = path.join(process.cwd(),"public/tmp/"+Date.now());
		request
			.get(url)
			.on('error',function (err){
				cb(err,null);
			})
			.on('response',function (response){
				if(response.statusCode != 200){
					cb("get Media fail",null);
				}else{
					var contentType = response.headers['content-type'];
					console.log(contentType);
					switch (contentType){
						case 'image/bmp': filePath += '.bmp';break;
						case 'image/png': filePath += '.png';break;
						case 'image/gif': filePath += '.gif';break;
						case 'image/jpeg': filePath += '.jpg';break;
						
					}
					response.pipe(fs.createWriteStream(filePath));
				}
			})
			.on('end',function (){
				cb(null,filePath);
			})
	})
}


module.exports = {
	getToken:getToken
	,getTokenPromise:getTokenPromise
	,getTicket:getTicket
	,getUserInfo:getUserInfo
	,getMedia:getMedia
}
