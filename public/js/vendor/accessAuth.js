define([
    'md5',
    'cookie',
    'p',
    'ajax'
], function (md5, Cookie, p, ajax) {
    'use strict';
    var myPromise = Promise || p;

    return function () {
        return new myPromise(function (resolve, reject) {
            //如果绑定直接渲染页面
            if (sessionStorage.getItem("isBinded") == "true") {
                resolve(true);
            } else {
                if (sessionStorage.getItem("isBinded") == undefined) {
                    sessionStorage.setItem("isBinded", "false");
                }
                if (sessionStorage.getItem("isBinded") == "false") {
                    var valuestr = JSON.stringify({
                        openID: localStorage.openID
                    });

                    var keystr = md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr);
                    ajax.ajaxPost('baymin/checkbind', {
                        key: keystr,
                        value: valuestr
                    }).then(function (res) {
                        switch (res.status) {
                            case 4:   //此微信账号已经绑定过了
                                // localStorage.setItem("openID", res.data[0]["openID"]);
                                sessionStorage.setItem("isBinded", "true");
                                sessionStorage.setItem("isBindedEnd", "true");
                                resolve('go');
                                break;
                            case 0:   //此微信号未绑定账号
                                // localStorage.setItem("openID", res.data[0]["openID"]);
                                reject(res.msg);
                                break;
                            default:
                                reject(res.msg);
                                break;
                        };
                    }).catch(function (error) { reject(error) });
                }
            }
        });
    }
});