require(['zepto', 'cookie', 'common', 'ajax', 'md5'], function ($, cookie, util, ajax, md5) {
    var codetime = "",
        code = "";

    //点击绑定
    $('.binding .check')
        .off('click')
        .on('click', function () {
            var acountNum = $('.account-num').val();
            var mobile = $('.account-mobile').val();
            var vcode = $('.vcode').val();
            if (acountNum && mobile && vcode) {
                bingingRequest(acountNum, mobile, vcode);
            } else {
                util.warningTip({
                    title: '提示',
                    context: '请完整填写有效信息',
                })
            }
        })

    //获取验证码
    $(".weui-vcode-btn").click(function () {
        var phone = $(".account-mobile").val();
        var valuestr = JSON.stringify({
            username: phone
        });
        ajax.ajaxPost('baymin/sendmsg', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (data) {
            switch (data.status) {
                case 0: //成功
                    code = data.data[0]["md5Value"];
                    codetime = data.data[0]["time"];
                    util.warningTip({
                        title: '验证码发送成功',
                        cb: function () {
                        }
                    })
                    break;
                default:
                    util.warningTip({
                        title: '验证码发送失败',
                        context: data.msg,
                        cb: function () {
                        }
                    })
                    break;
            };
        }).catch(function (error) { });
    });

    //表单校验
    function check($dom, expr) {
        var num = $dom.val();
        if (expr.test(num)) {
            $dom.parents(".weui-cell").removeClass("weui-cell_warn");
            $dom.parents(".weui-cell").find(".weui-icon-warn").hide();
        } else {
            $dom.parents(".weui-cell").addClass("weui-cell_warn");
            $dom.parents(".weui-cell").find(".weui-icon-warn").show();
        }
    }
    $(".account-mobile").blur(function () {
        check($(this), /^1[3|4|5|7|8][0-9]{9}$/);
    });
    $(".account-num").blur(function () {
        check($(this), /^[0-9][0-9]*$/);
    });
    $(".vcode").blur(function () {
        check($(this), /^[0-9][0-9]*$/);
    });

    //点击查看示例
    $(".weui-account-btn").click(function () {
        $(".weui-gallery").show();
        $('.weui-gallery span').css('background-image', "url(/imgs/timg.jpg)");
    });
    $(".weui-gallery__cancel").click(function () {
        $(".weui-gallery").hide();
    });

    //绑定请求
    function bingingRequest(acountNum, mobile, vcode) {
        var valuestr = JSON.stringify({
            username: mobile,
            accountNumber: acountNum,
            openID: localStorage.openID,
            checkNum: vcode,
            md5Value: code == "" ? "111" : code,
            time: codetime == "" ? "222" : codetime
        });
        ajax.ajaxPost('baymin/bind', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0: //成功
                    // localStorage.setItem("openID", res.data[0]["openID"]);
                    localStorage.setItem("accountNumber", res.data[0]["accountNumber"]);
                    sessionStorage.setItem("isBinded", "true");
                    sessionStorage.setItem("isBindedEnd", "false");
                    // setCookie('account', res.data[0]["openID"]);
                    return getBabyInfo();
                    break;
                default:
                    throw new Error('BIND_ERROR' + res.msg);
                    break;
            };
        }).then(function (res) {
            switch (res.status) {
                case 0:   //成功
                    // localStorage.setItem("openID", res.data[1]["openID"]);
                    localStorage.setItem("relation", res.data[1]["relation"]);
                    localStorage.setItem("cname", res.data[0]["cname"]);
                    localStorage.setItem("birthday", res.data[0]["birthday"]);
                    localStorage.setItem("sex", res.data[0]["sex"]);
                    localStorage.setItem("accountNumber", res.data[1]["accountNumber"]);
                    location.hash = 'babyInfo';
                    break;
                default:
                    throw new Error('GET_BABY_ERROR' + res.msg);
                    break;
            };
        }).catch(function (error) {
            if (error.message.indexOf('BIND_ERROR') > -1){
                util.warningTip({
                    title: '绑定失败',
                    context: error.message,
                    cb: function () {
                    }
                });
            }
            if (error.message.indexOf('GET_BABY_ERROR') > -1){
                util.warningTip({
                    title: '宝宝信息获取失败',
                    context: error.message,
                    cb: function () {
                    }
                });
            }
         });
    }

    //查询宝宝信息
    function getBabyInfo() {
        var valuestr = JSON.stringify({
            openID: localStorage.openID
        });

        var keystr = md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr);
        // openID: getCookie('account')
        return ajax.ajaxPost('baymin/getbabyinfo', {
            key: keystr,
            value: valuestr
        })
    }

})