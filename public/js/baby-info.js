require(['zepto', 'weui', 'ajax', 'md5', 'common'], function ($, weui, ajax, md5, util) {
    var isChanged = false;

    if (sessionStorage.isBinded && localStorage.cname && localStorage.sex && localStorage.birthday && localStorage.relation) {
        $("#baby-name").val(localStorage.cname);
        $("#gender .weui-cell__bd .val").text(localStorage.sex);
        $("#age .weui-cell__bd .val").text(localStorage.birthday);
        $("#family .weui-cell__bd .val").text(localStorage.relation);
        $(".weui-btn").text("完成");
    } else {
        $(".weui-btn").text("下一步");
    }

    $('#gender').on('click', function () {
        isChanged = true;
        weui.picker([{
            label: '小王子',
            value: 0
        }, {
            label: '小公主',
            value: 1
        }], {
                onChange: function (result) { },
                onConfirm: function (result) {
                    $('#gender .val').html(result[0].label)
                }
            });
    });
    $('#family').on('click', function () {
        isChanged = true;
        weui.picker([{
            label: '爸爸',
            value: 0
        }, {
            label: '妈妈',
            value: 1
        }, {
            label: '其他亲属',
            value: 2
        }], {
                onChange: function (result) { },
                onConfirm: function (result) {
                    $('#family .val').html(result[0].label)
                }
            });
    });
    $('#age').on('click', function () {
        isChanged = true;
        weui.datePicker({
            start: new Date().getFullYear() - 5,
            end: new Date().getFullYear(),
            onChange: function (result) { },
            onConfirm: function (result) {
                $('#age .val').html(result[0].label + result[1].label + result[2].label)
            }
        });
    });

    $(".weui-btn").click(function () {
        event.preventDefault();
        if ($(this).text() == "完成") {
            if (isChanged) {
                modifyBabyInfo();
            }
            location.hash = "account";
        } else {
            modifyBabyInfo();
            location.hash = "task";
        }
    });

    function modifyBabyInfo() {
        var bname = $("#baby-name").val();
        var bsex = $("#gender .weui-cell__bd .val").text();
        var bage = $("#age .weui-cell__bd .val").text();
        var brela = $("#family .weui-cell__bd .val").text();
        var valuestr = JSON.stringify({
            openID: localStorage.openID,
            cname: bname,
            sex: bsex,
            birthday: bage,
            relation: brela
        });
        ajax.ajaxPost('baymin/setbabyinfo', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0: //成功
                    localStorage.setItem("relation", brela);
                    localStorage.setItem("cname", bname);
                    localStorage.setItem("birthday", bage);
                    localStorage.setItem("sex", bsex);
                    break;
                default:
                    util.warningTip({
                        title: '设置宝宝信息失败',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    break;
            };
        }).catch(function (error) { });

    }
})