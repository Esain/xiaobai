var path = require("path");
var fs = require("fs");
// var redisUtil = require(path.join(process.cwd(),"compoment/redisUtil.js"));
var util = require(path.join(process.cwd(),"/compoment/util.js"));
// var weixinUtil = require(path.join(process.cwd(),"/compoment/weixinUtil.js"));
// var userStatistics = require(path.join(process.cwd(),"/compoment/userStatistics.js"));
// var customerService = require(path.join(process.cwd(),"/compoment/customerService.js"));
// var tencentyun = require(path.join(process.cwd(),"compoment/tencentyun/tencentyunUtil.js"));

var processMsg = function (user_msg,req,resp,next){
	// weixinUtil.getUserInfo(user_msg.FromUserName,function (userInfo){
	// 	//写进数据库，触发sokect.io	
	// 	mysocket.sent2AllMsg({userId:user_msg.FromUserName,username:userInfo.nickname,content:user_msg.Content});
	// 	// mysocket.send2OneMsg({userId:user_msg.FromUserName,username:userInfo.nickname,content:user_msg.Content});
	// 	if(user_msg.Content =="转接"){
	// 		return sentService(user_msg,resp,next);
	// 	}
		
	// 	console.log("userInfo : ",userInfo);	
		 sendMsg("",user_msg,resp,next);
	// })

}

var sendMsg = function (context,user_msg,resp,next){
	var respMsg = {
		ToUserName : user_msg.FromUserName,
		FromUserName : user_msg.ToUserName,
		CreateTime : new Date().getTime(),
		MsgType : "text",
		Content : context || "已收到!"
	}
	var respXml = util.js2Xml(respMsg);
	// console.log(respXml);
	resp.send(respXml);
}

// var sentService = function (user_msg,resp,next){
// 	customerService.getUserFKAccountPromise(user_msg.FromUserName)
// 		.then(function (kfAccount){
// 				var respMsg = {
// 					ToUserName : user_msg.FromUserName,
// 					FromUserName : user_msg.ToUserName,
// 					CreateTime : new Date().getTime(),
// 					MsgType : "transfer_customer_service",
// 				}
// 				if(kfAccount){
// 					respMsg.TransInfo = { "KfAccount" : kfAccount };
// 				}
// 				var respXml = util.js2Xml(respMsg);
// 				console.log(respXml);
// 				resp.send(respXml);
// 		},function (err){
// 			console.log(err);
// 		})

// }

var processEvent = function (event_msg,req,resp,next){
	console.log("event : ",event_msg);
	//存入数据库
	switch(event_msg.Event){
		case "CLICK": 
			if(event_msg.EventKey === 'WATING_DEV'){
				sendMsg('正在努力开发中...<a href="http://47.52.238.90/login">绑定账号</a>',event_msg,resp,next);
			}
			if(event_msg.EventKey === ''){
				
			}
			break;
		// case "kf_switch_session": 
		// 	userStatistics.putTransferRecord(event_msg.FromUserName
		// 										,event_msg.ToKfAccount
		// 										,event_msg.CreateTime);break;
		// case "kf_close_session": 
		// 	userStatistics.putEndRecord(event_msg.FromUserName
		// 									,event_msg.KfAccount
		// 									,event_msg.CreateTime);break;
	}
}

var processImage = function (image_msg,req,resp,next){
	// var mediaId  = image_msg.MediaId;
	// util.toPromise(weixinUtil.getMedia,weixinUtil)(mediaId)
	// 	.then(function (filepath){
	// 		var state = fs.statSync(filepath);
	// 		if(state && state.size > 0){
	// 			//upload to tencentyun
	// 			return util.toPromise(tencentyun.upload,tencentyun)(filepath);
	// 		}else{
	// 			throw new Error("user image download failed");
	// 		}
	// 	},function (err){	
	// 		console.log(err);
	// 	}).then(function (picUrl){
	// 		console.log("picUrl : ",picUrl,"/n------------------");
	// 		weixinUtil.getUserInfo(image_msg.FromUserName,function (userInfo){
	// 			console.log(userInfo);
	// 			mysocket.sent2AllMsg({userId:image_msg.FromUserName,username:userInfo.nickname,url:picUrl});
	// 			// io.emit('newMsg',{userId:image_msg.FromUserName,username:userInfo.nickname,url:picUrl});
	// 		});
	// 	},function (err){
	// 		console.log(err);
	// 	});
}
module.exports={
	processMsg:processMsg,
	processEvent:processEvent,
	processImage:processImage,
}

