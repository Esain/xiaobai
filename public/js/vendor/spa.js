define(['zepto', 'ajax', 'md5', 'cookie'], function ($, ajax, md5, cookie) {

    function Vipspa() {

    }

    Vipspa.prototype.start = function (config) {
        var self = this;
        self.routerMap = config.router;
        self.mainView = config.view;
        self.errorTemplateId = config.errorTemplateId;
        startRouter();
        window.onhashchange = function () {
            startRouter();
        };
    };
    var messageStack = [];
    // {
    //     'id': 'home_bindcard',
    //     'content': 
    //     }
    // }
    Vipspa.prototype.getMessage = function (id) {
        var msg = {};
        $.each(messageStack, function (i, e) {
            if (e.id === id) {
                msg = e;
            }
        });
        return msg;
    };

    Vipspa.prototype.setMessage = function (obj) {
        var _obj = JSON.parse(JSON.stringify(obj));
        $.each(messageStack, function (i, e) {
            if (e.id === _obj.id) {
                e = _obj;
                return false;
            }
        });
        messageStack.push(_obj);
    };
    Vipspa.prototype.delMessage = function (id) {
        if (typeof id === 'undefined') {
            return false;
        }
        var index = 0;
        $.each(messageStack, function (i, e) {
            if (e.id === id) {
                index = i;
            }
        });
        $.each(messageStack, function (i, e) {
            if (i > index) {
                messageStack[i - 1] = e;
            }
        });
    };
    Vipspa.prototype.clearMessage = function (id) {
        var index = 0;
        messageStack = [];
    };

    Vipspa.prototype.stringify = function (routerUrl, paramObj) {
        var paramStr = '',
            hash;
        for (var i in paramObj) {
            paramStr += i + '=' + encodeURIComponent(paramObj[i]) + '&';
        }
        if (paramStr === '') {
            hash = routerUrl;
        } else {
            paramStr = paramStr.substring(0, paramStr.length - 1);
            hash = routerUrl + '?' + paramStr;
        }
        return hash;
    };
    Vipspa.prototype.parse = function (routerHash) {
        var hash = typeof routerHash === 'undefined' ? location.hash : routerHash;
        var obj = {
            url: '',
            param: {}
        };
        var param = {},
            url = '';
        var pIndex = hash.indexOf('?');
        if (hash === '') {
            return obj;
        }

        if (pIndex > -1) {
            url = hash.substring(1, pIndex);
            var paramStr = hash.substring(pIndex + 1);
            var paramArr = paramStr.split('&');

            $.each(paramArr, function (i, e) {
                var item = e.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if (key !== '') {
                    param[key] = decodeURIComponent(val);
                }


            });
        } else {
            url = hash.substring(1);
            param = {};
        }
        return {
            url: url,
            param: param
        };
    };

    function routerAction(routeObj) {
        var routerItem = vipspa.routerMap[routeObj.url];
        console.log(routerItem);
        if (typeof routerItem === 'undefined') {
            var defaultsRoute = vipspa.routerMap.defaults;
            routerItem = vipspa.routerMap[defaultsRoute];
            location.hash = defaultsRoute;
            return false;
        }
        var openID = cookie.getCookie('openID');
        if (!openID) {
            location.hash = 'binding';
        }

        localStorage.setItem("openID", openID);

        if (!routerItem.requireAuth) {
            //判断是否已经绑定
            if (sessionStorage.getItem("isBinded") == undefined) {
                sessionStorage.setItem("isBinded", "false");
            }
            if (sessionStorage.getItem("isBinded") == "false") {
                var valuestr = JSON.stringify({
                    openID: openID
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
                            location.hash = 'account';
                            break;
                        case 0:   //此微信号未绑定账号
                            // localStorage.setItem("openID", res.data[0]["openID"]);
                            location.hash = 'binding';
                            break;
                        default:
                            location.hash = 'binding';
                            break;
                    };
                }).catch(function (error) { });
            }
        }

        $.ajax({
            type: 'GET',
            url: routerItem.templateUrl,
            dataType: 'html',
            success: function (data, status, xhr) {
                // 请求拦截
                $(vipspa.mainView).html(data);
                document.title = routerItem.title;
                loadScript(routerItem.controller);
            },
            error: function (xhr, errorType, error) {
                if ($(vipspa.errorTemplateId).length === 0) {
                    return false;
                }
                var errHtml = $(vipspa.errorTemplateId).html();
                errHtml = errHtml.replace(/{{errStatus}}/, xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/, xhr.responseText);
                $(vipspa.mainView).html(errHtml);
            }
        });
    }

    function startRouter() {
        var hash = location.hash;
        var routeObj = vipspa.parse(hash);
        routerAction(routeObj);
    }

    function loadScript(src, callback) {

        var script = document.createElement('script'),
            loaded;
        script.setAttribute('src', src);
        script.onreadystatechange = script.onload = function () {
            script.onreadystatechange = null;
            document.documentElement.removeChild(script);
            script = null;
            if (!loaded) {
                if (typeof callback === 'function')
                    callbackÏ();
            }
            loaded = true;
        };
        document.documentElement.appendChild(script);
    }

    var vipspa = new Vipspa();

    return vipspa;
})