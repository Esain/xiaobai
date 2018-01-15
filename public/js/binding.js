require(['zepto', 'cookie'], function($, cookie) {
    //写cookies
    $('.binding').find('.check')
        .off('click')
        .on('click', function() {
            var acountNum = $('.account-num').val();
            var mobile = $('.account-mobile').val();
            var vcode = $('.vcode').val;
            if (acountNum && mobile && vcode) {
                setCookie('account', 'kdc-test')
                location.hash = 'baby/info';
            } else {
                $('.weui-tips').removeClass('hide');
            }
        })

<<<<<<< HEAD
=======
    //获取验证码
    $(".weui-vcode-btn").click(function () {
        var phone = $(".account-mobile").val();
        var valuestr = JSON.stringify({
            username: phone
        });
        ajax.ajaxPost('http://192.168.90.23:8079/baymin/sendmsg', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (data) {
            switch (data.status) {
                case 1: //成功
                    code = data.data[0]["md5Value"];
                    codetime = data.data[0]["time"];
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
        }, function (error) {
            console.log(error);
        }).catch(function (error) {});
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
    $(".weui-account-btn").click(function(){
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
            openID:localStorage.openID,
            checkNum: vcode,
            md5Value:code,
            time:codetime
        });
        ajax.ajaxPost('http://192.168.90.23:8079/baymin/bind', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0: //成功
                    localStorage.setItem("openID", res.data[0]["openID"]);
                    localStorage.setItem("accountNumber", res.data[0]["accountNumber"]);
                    localStorage.setItem("isBinded","true");
                    // setCookie('account', res.data[0]["openID"]);
                    location.hash = 'babyInfo';
                    break;
                default:
                    util.warningTip({
                        title: '绑定失败',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    break;
            };
        }).catch(function (error) {});
    }


>>>>>>> a559fdacd920b86bb9c410eba43f120e4d0d96ee

})