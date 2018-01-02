/**
 * Created by xiehua on 15-4-15.
 'use strict';
 */
var redis = require("redis");
var path = require('path');
var env = require(path.join(process.cwd(),'compoment/env.js'));
//var util = require(path.join(process.cwd(),"/compoment/util/util.js"));

var client = redis.createClient(env.REDIS_PORT,env.REDIS_HOST,{auth_pass:env.REDIS_PASS});
client.on("connect",function(){
    console.info("redis connect:"+env.name);

});
client.on("error",function(err){
    console.info("redis connect error:"+env.name+" "+err.stack);
});

var redis_db ={
    redisMsg:1,
    redis:2,
    redisStatistics:3,
    redisUsers:4,
    redisRecords:5, //聊天记录{}
};
/**
 *
 * @param db db库
 * @returns {Object}
 */
var getRedis = function(db){
    var redis_obj = new Object();
    redis_obj.db = db;
    redis_obj.getClient = function(){
        client.select(redis_obj.db,function(){});
        return client;
    };
    redis_obj.get = function(key,fn){
        return redis_obj.getClient().get(key,fn);
    };
    /**
     * set
     * @param key
     * @param value
     * @param ［seconds］过期时间可选
     */
    redis_obj.set = function(key,value,seconds){
        if(typeof value =="object"){
            value = JSON.stringify(value);
        }
        redis_obj.getClient().set(key,value);
        if(seconds){
            redis_obj.getClient().expire(key,seconds);
        }

    };
    /**
     * get and remove
     */
    redis_obj.getAndRemove =function(key,fn){
        redis_obj.get(key).then(function(result){
            fn(result);
        }).then(function(){
            redis_obj.getClient().expire(key,-1);
        });
    };
    /**
     * get all keys
     */
    redis_obj.getKeys = function(key,fn){
       redis_obj.getClient().keys(key,fn);
    };

    /**
    * get multi value
    */
    redis_obj.getMulti = function(key,fn){
        redis_obj.getKeys(key,function (err,replies){
            redis_obj.getClient().mget(replies,fn);
        })
    };
    /**
    * remove
    */
    redis_obj.remove = function (key){
        redis_obj.getClient().expire(key,-1);
    }
    return redis_obj;
};


// var redisSms = new getRedis(redis_db.redisSms);
var redisMsg = new getRedis(redis_db.redisMsg);
// var redisStatistics = new getRedis(redis_db.redisStatistics);
// var redisUsers = new getRedis(redis_db.redisUsers);
// var redisRecord = new getRedis(redis_db.redisRecord);

module.exports = {
    // redisSms:redisSms,
    redisMsg:redisMsg,
    // redisStatistics:redisStatistics,
    // redisUsers:redisUsers,
    // redisRecord:redisRecord,
};

