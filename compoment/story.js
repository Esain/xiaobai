var request = require("request");
var path = require("path");
var fs = require("fs");
var env = require("../compoment/env.js");
var util = require("../compoment/util.js");

var getStoryList = function (openId, cb) {
    let encyObj = { openId: openId, date: Date.now() };
    let encyStr = JSON.stringify(encyObj);
    let appKey = '8d98b93a0d4e1777acb36d4404c61854';
    let keyStr = null;
    try {
        keyStr = util.cry2MD5(appKey + encyStr);
    } catch (error) {
        return cb(error, null);
    }
    let postObj = { value: encyStr, key: keyStr };
    console.log('getStroyList param: ', postObj);
    let uri = `${env.MANAGEMENT_HOST}/baymin/care/getListenStorys`;
    request({
        method: 'GET',
        uri: uri,
        qs: postObj
    }, function (error, resp, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            console.log(body)
            if (body.status == 4) {
                cb(null, `获取宝宝今天的故事列表,请先<a href="${env.REDIRECT_URI}">绑定账号</a>`);
            } else if (body.status != 0) {
                cb(error, null);
            } else {
                if (Array.isArray(body.data)) {
                    if (body.data.length != 0) {
                        let storyArr = [];
                        body.data.forEach(function (item) {
                            try {
                                let obj = JSON.parse(item)
                                storyArr.push(obj.careContent);
                            } catch (error) {
                                console.error(`story parse string :  ${item} , error:  ${error.message}`);
                            }
                        });
                        let storyStr = storyArr.join('</br>');
                        cb(null, `今天的故事列表</br>${storyStr}`);
                    } else {
                        cb(null, '宝宝今天还没有听故事哦~');
                    }
                } else {
                    cb(null, '宝宝今天还没有听故事哦~');
                }

            }
        } else {
            cb('获取故事列表请求失败', null);
        }
    })

}

module.exports = {
    getStoryList: getStoryList
}