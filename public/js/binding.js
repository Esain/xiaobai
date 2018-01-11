require(['zepto', 'cookie','common','ajax','md5'], function ($, cookie,util,ajax,md5) {
    var codetime="", 
        code="";
    
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
        }, function (error) {
            console.log(error);
        }).catch(function (error) {});
    }



})