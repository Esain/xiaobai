define(['zepto', 'ajax', 'md5', 'cookie', 'p'], function ($, ajax, md5, Cookie, p) {
    var myPromise = Promise || p;

    function Vipspa() {
        this.bindingRoute = 'binding';
        this.firstLoad = true;
        this.prevHash = location.hash;
        var openID = Cookie.getCookie('openID');
        if (!openID) {
            alert('获取openID失败');
        }

        localStorage.setItem("openID", openID);
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
        // console.log(routerItem)
        if (typeof routerItem === 'undefined') {
            var defaultsRoute = vipspa.routerMap.defaults;
            routerItem = vipspa.routerMap[defaultsRoute];
            location.hash = defaultsRoute;
            return false;
        }
        // console.log(routerItem);
        var authPromise = routerItem.requireAuth ? routerItem.requireAuth() : myPromise.resolve(1);
        //判断是否已经绑定
            
        authPromise.then(function () {
            getPage();
        }).catch(function (error) {
            if(error.statck){
                console.log(error);
            }else{
                console.log(error);
                location.hash = vipspa.bindingRoute;
            }
        });

        function getPage() {
            $.ajax({
                type: 'GET',
                url: routerItem.templateUrl,
                dataType: 'html',
                success: function (data, status, xhr) {
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
    }

    function startRouter() {
        var hash = location.hash;
        var routeObj = vipspa.parse(hash);
        if(vipspa.prevHash != hash){
            vipspa.prevHash = location.hash;
            routerAction(routeObj);
        } else if (vipspa.firstLoad){
            routerAction(routeObj);
        }
        vipspa.firstLoad = false;
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
                    callback();
            }
            loaded = true;
        };
        document.documentElement.appendChild(script);
    }

    var vipspa = new Vipspa();

    return vipspa;
})