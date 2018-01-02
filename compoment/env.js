/**
 * Created by xiehua on 15-4-16.
 */
//TODO 开发上有的一些问题
/**
 * 现在会将验证码发给客户端和log打出，到时候要删除[app_login.js]
 * order的请求是要有session的，为了开发上的方便，现在暂时没加
 *
 */
/**
 * sms   短信开关 0为关，1为开
 *
 */
//开发环境配置
var dev_env = {
    name: 'dev',
    sms:1,                              //短信
    SEVER_LISTEN_PORT:80,            //服务器监听端口

    //redis
    REDIS_PORT : 6379,                 //redis端口
    REDIS_HOST : '127.0.0.1',     //redis服务器地址
    REDIS_PASS : 'xiaobai',

    MANAGEMENT_HOST:"http://127.0.0.1:8081",//后台服务器地址
    //微信相关配置
    WEI_XIN_APP_ID: "wxb00577c81c47eecd",
    WEI_XIN_SECRET: "1906a54e388e3ced32d303c456fbe60d",
    WEI_XIN_TOKEN: "yangyixin123"

};
//线上环境配置
var online_env = {
    name :'online',
    sms:0,                                            //短信
    SEVER_LISTEN_PORT: 80,            //服务器监听端口
    //redis
    REDIS_PORT : 6379,                 //redis端口
    REDIS_HOST : 'http://127.0.0.1',     //redis服务器地址
    //微信相关配置
    WEI_XIN_APP_ID: "wx2b501019002ef8cb",
    WEI_XIN_SECRET: "e4e5d0b84316b1251a5e0051a34e9e02",
    WEI_XIN_TOKEN: "yangyixin123"
};
var staging_env= {
    name: 'staging',
    sms:0,                              //短信
    //redis
    REDIS_PORT : 6379,                 //redis端口
    REDIS_HOST : '60.191.203.122',     //redis服务器地址dev内网ip

};

// module.exports = dev_env;
 // module.exports = staging_env;
module.exports = online_env;


