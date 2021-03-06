require([
    'require',
    'ajax',
    'md5',
    'common',
], function (require, ajax, md5, util) {

    if (sessionStorage.isBinded == "true") {
        if (localStorage.cname){
            $(".accountname p").text(localStorage.cname);
        }else{
            getBabyInfo();
        }
    }

    $(".check").click(function () {
        unBind();
    });

    //查询宝宝信息
    function getBabyInfo() {
        var valuestr = JSON.stringify({
            openID: localStorage.openID
        });
      
        var keystr = md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr);
        // openID: getCookie('account')
        ajax.ajaxPost('baymin/getbabyinfo', {
            key: keystr,
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0:   //成功
                    // localStorage.setItem("openID", res.data[1]["openID"]);
                    localStorage.setItem("relation", res.data[1]["relation"]);
                    localStorage.setItem("cname", res.data[0]["cname"]);
                    localStorage.setItem("birthday", res.data[0]["birthday"]);
                    localStorage.setItem("sex", res.data[0]["sex"]);
                    localStorage.setItem("accountNumber", res.data[1]["accountNumber"]);
                    $(".accountname p").text(res.data[0]["cname"]);
                    break;
                default:
                    util.warningTip({
                        title: '宝宝信息获取失败',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    break;
            };
        }).catch(function (error) { });
    }

    //解除绑定
    function unBind() {
        var valuestr = JSON.stringify({
            openID: localStorage.openID
        });
        var keystr = md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr);
        // openID: getCookie('account')
        ajax.ajaxPost('baymin/unbind', {
            key: keystr,
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0:   //成功
                    localStorage.clear();
                    localStorage.setItem("openID", res.data[0]["openID"]);
                    sessionStorage.setItem("isBinded", "false");
                    sessionStorage.setItem("isBindedEnd", "false");
                    util.warningTip({
                        title: '提示',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    break;
                default:
                    util.warningTip({
                        title: '解除绑定失败',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    break;
            };
        }).catch(function (error) { });
    }

});