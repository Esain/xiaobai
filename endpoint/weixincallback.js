'use strict'
var path = require('path');
var constants = require("../compoment/constants.js");
var env = require("../compoment/env.js");
var crypto = require("crypto");
var parseString = require("xml2js").parseString;
var wxmsg = require("../compoment/wxmsg.js");
var redisUtil = require(path.join(process.cwd(),"compoment/redisUtil.js"));

module.exports = function (req,resp,param,next){
	// console.log(param);
	var signature = param.signature;
	// console.log("signature:  ",signature);
	var timestamp = param.timestamp;
	var nonce = param.nonce;
	var token = env.WEI_XIN_TOKEN;

	var echostr = param.echostr;
	var str = [nonce,timestamp,token].sort().join("");
	
	var sign_str = crypto.createHash("sha1").update(str).digest("hex");
	// console.log(signature);
	if(req.method=="GET"){
		if(sign_str == signature){
			resp.send(echostr) ;
		}else{
			resp.send("false");
		}
	}else{
		processMsg(req,resp,next);
	}
	
}

function processMsg(req,resp,next){
	var post_data ='';
	req.on('data',function (chunck){
		post_data += chunck;
	})
	req.on('end',function (){
		console.log('Accept Data : ',post_data);
		parseString(post_data,{explicitArray:false,explicitRoot:false},function (err,user_msg){
			
			var msgId  = user_msg.MsgId;
			var createTime = user_msg.CreateTime;
			redisUtil.redisMsg.get(msgId+"_"+createTime,function (err,value){
				if(value){
					resp.send("success");
				}else{
					redisUtil.redisMsg.set(msgId+"_"+createTime,"in",8000);

					var msgType = user_msg.MsgType;
					switch(msgType){
						case 'event':
							wxmsg.processEvent(user_msg,req,resp,next);break;
						case 'text':
							wxmsg.processMsg(user_msg,req,resp,next); 
							break;
						case 'image':
							// wxmsg.processImage(user_msg,req,resp,next);
						break;
						case 'video':break;
						case 'location':break;
						case 'link':break;
						case 'voice':break;
					} 
				}
			});
		});
	})
}