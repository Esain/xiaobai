/**
 * 合并json或对象，会排除对象的方法
 * @param argus 可传入0~n个对象,后面对象的属性会覆盖之前出现的
 * @returns object
 */

'use strict';
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var cryto = require('crypto');
var constants = require("./constants.js");
var env = require("./env.js");
var request = require("request");

var mergeJson = function(){
    var param = Array.prototype.slice.call(arguments,0);//将arguments转为数组
    var obj = {};
    param.forEach(function(item){
        if(typeof item=== "object"){
            for(var attr in item){
                if(typeof attr === "string"){
                    obj[attr] = item[attr];
                }
            }
        }
    });
    return obj;
};
/**
 * 日期格式化
 * @param dateString 可以是string【2015-04-03 00:00:00】,可以是时间戳的时间格式【142123124124】
 * @param fmt 要输出的格式【yyyy年MM月dd日 hh时mm分ss秒】
 * @returns string 【2015年04月03日 00时00分00秒】
 */
 var dateFormat = function(dateString,fmt){
    var date = new Date(dateString);
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    var o ={
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };

/**
 * 对最后一个参数为callback(err,result) 的函数进行封装，返回一个函数，该函数调用的时候(不带callback)返回一个promise,
 * eg: 原有：function f(x,y,callback)
 *     var g = toPromise(f)
 *     g(x,y).then(...);
 *
 * @param f  要求该函数最后个参数为callback(err ,result)
 * @param context 上下文 可为空
 * @returns {Promise}
 */
 var toPromise = function(f, context){
    // var self = this;
    return function(){
        var otherArgs = Array.prototype.slice.call(arguments);
       // assert.equal(arguments.length, f.length-1);//without callback
        return new Promise(function(resolve, reject){
            otherArgs.push(//add callback for f
                function(err, result){
                    if(err) return reject(err);
                    else return resolve(result);
                }
                );
            f.apply(context || null, otherArgs);
        });
    }
};

/**
 * 将一个签名为（xx,xx,.... cb）签名的函数转化为一个2段函数F
 * ＝＝ 将 f(xx,xx...cb)调用 转为  f(xx, xx)(cb)
 * 相当于半固定化的柯里化
 *
 *
 * @param asyncFn 最后一个参数为callback的函数
 * @returns {Function}
 */
 var trunk = function(asyncFn,context){
    return function(){
        var argsWithoutCb = arguments;
        return function(cb){
         return asyncFn.apply(context || null, Array.prototype.slice.call(argsWithoutCb).concat(cb));
     }
 }
}

/**
 * 将一个数组按指定大小分割成多个数组
 *
 * @param arr
 * @param lenth
 * @returns {*} 二维数组，数组套数组
 */
 function splitArray(arr, length){
    return arr.reduce(function(prev, current){
        var lastArray = prev[prev.length -1];
        if(lastArray.length>=length){
            prev.push([current]);
        }else{
            lastArray.push(current);
        }
        return prev;
    },[[]]);
}



/**
 * 递归遍历指定文件夹下所有文件
 *
 * @param dir       绝对目录
 * @param callback  接受2个参数(file,path)，表示文件的File,及之前的绝对路径PATH(最后不带/)
 * @param f         文件或文件夹过滤器，接受1个全路径的文件名,返回true or false
 */
 function visitD (dir, callback, f){
   fs.readdirSync(dir)
   .filter(function(file){return f ? f(path.join(dir, file)):true})
   .forEach(function(file){
    var stats = fs.statSync(path.join(dir, file));
    if(stats.isDirectory()){
        visitD(path.join(dir, file), callback, f);
    }else if (stats.isFile()) {
        callback(file, dir);
    }
})
}


/**
 * 递归列出所有文件，除了隐藏文件
 * @param dir
 * @param callback
 */
var listFile = function(dir, callback){
    visitD(dir, callback, function(aPath){
       return path.basename(aPath).indexOf('.') != 0;
   });
};
/**
 * 生成验证码
 * @returns {string}
 */
 var getGenerateCode = function(){
    var code = "";
    for(var i = 0;i<6;i++){
        code += parseInt(Math.random()*10);
    }
    return code;
};

/**
* 加密字符串
* @param {String} text
* @return {String} md5String
**/
var cry2MD5 = function (text){
    var str = new Buffer(text).toString("binary");
    return cryto.createHash('md5').update(text).digest('hex');
};

var getPage = function(currPage,totalPage,pageSize){
    return {curr_page:Number(currPage),total:Number(totalPage),page_size:Number(pageSize)};
};

var removePrefix =function (obj){
    if(obj instanceof Array){
        return obj.map(function (tmp){
            return removePrefix(tmp);
        });
    }
    if(typeof obj=="object"){
        var newObj = new Object();
        for(var key in obj){
            newObj[key.substring(key.indexOf(".")+1,key.length)] = obj[key];
        }
        return newObj;
    }else if(typeof obj=='string'){
        return obj.substring(obj.indexOf(".")+1,obj.length);
    }
};

/**
 *
 * @param obj
 * @returns {{}}
 */
 var stringfyObject = function (obj){
    var newObj = {};
    for(var key in obj){
        if(typeof  obj[key] =="object"){
            newObj[key]=JSON.stringify(obj[key]);
        }else{
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

var objectEqual = function(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
};
/**
 * obj {}
 * properties []
 *删除obj中的properties中的属性
 *
 */
 var delObjectProperty = function(properties,obj){
    var result = {};
    for(var key in obj){
        if(properties.indexOf(key)==-1){
            result[key] = obj[key];
        }
    }
    return result;
};
var createToken =function(id){
    var tokenKey = constants.TOKEN_KEY;
    return cry2MD5(id+tokenKey);
};

var js2Xml = function (json_data){
    function generatePart(root,data){
        var wrapper='';
        var temp ='';
        var keys = Object.keys(data);
        keys.forEach(function (key){
            // var temp ='';
            var text = data[key]
            if(typeof text ==='string'){
                temp = temp.concat('<',key,'><![CDATA[',data[key],']]></',key,'>');
            }else if(typeof text === 'object'){
                temp += generatePart(key,text);
            }else{
                temp = temp.concat('<',key,'>',data[key],'</',key,'>');
            }
        })
        if(root){
            return wrapper.concat('<',root,'>',temp,'</',root,'>');
        }else{
            return wrapper.concat('<xml>',temp,'</xml>');
        }
    }
    return generatePart(null,json_data);
}

var myRequest = function(method,uri,data,cb){
    request({
        "method" : method,
        "uri" : uri,
        "json" : data,
    },function (err,resp,body){
        if(!err && resp.statusCode != 200 && body.errcode != 0){
            cb( (err || body.errmsg) , null);    
        }else{
            cb( null , body);
        }
    });
}


var myRequestPromise = toPromise(myRequest,null);
module.exports={
    mergeJson:mergeJson,
    dateFormat:dateFormat,
    listFile: listFile,
    toPromise:toPromise,
    getGenerateCode:getGenerateCode,
    cry2MD5 : cry2MD5,
    getPage : getPage,
    visitD: visitD,
    trunk:trunk,
    removePrefix:removePrefix,
    stringfyObject:stringfyObject,
    splitArray:splitArray,
    objectEqual:objectEqual,
    delObjectProperty:delObjectProperty,
    createToken:createToken,
    js2Xml:js2Xml,
    myRequest:myRequest,
    myRequestPromise:myRequestPromise,
};
//console.log(splitArray([1,2,3,4,5,6], 5));