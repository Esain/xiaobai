require(['zepto', 'weui', 'ajax', 'md5', 'common'], function ($, weui, ajax, md5, util) {
    var accountNumber;
    var actions = [{
        label: '起床',
        value: 0
    }, {
        label: '睡觉',
        value: 1
    }, {
        label: '讲故事',
        value: 2
    }]

    function renderPgaes() {
        actions.forEach(function (item) {
            var tpl = getTpl(item)
            $('.task').find('.main-panel').append(tpl);
        });

        $('.main-panel').on('click', '.weui-cell', function (e) {
            console.log($(this));
            var oldaction = $(this).find(".weui-cell__bd").text();
            var oldtime = $(this).find(".weui-cell__ft span").text();
            oldtime = oldtime.toString().split("提醒")[0];
            setTime(oldaction, oldtime, e);
        });
    }

    var getTpl = function (item) {
        var timestr = "";
        if (item.time && item.time != null) {
            timestr = item.time + "提醒";
        }
        return '<div class="weui-cell weui-cell_access" data-type="' + item.value + '">\n' +
            '            <div class="weui-cell__bd">' + item.label + '</div>\n' +
            '            <div class="weui-cell__ft">\n' +
            '                <span class="val mr20">' + timestr + '</span>\n' +
            '            </div>\n' +
            '        </div>'
    }



    var setTime = function (oldaction, oldtime, e) {
        var $this = $(e.target).closest('.weui-cell_access');
        weui.picker(getNumArr(0, 24, '时'), getNumArr(0, 59, '分'), {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                console.log(result);
                $this.find('.val').html(result[0].value + ' : ' + result[1].value + '提醒');
                var newaction = $this.find(".weui-cell__bd").text();
                var newtime = $this.find(".weui-cell__ft span").text();
                newtime = (newtime + "").split("提醒")[0];
                modifyTask(oldaction, oldtime, newaction, newtime);
            }
        });
    }

    var getNumArr = function (start, end, unit) {
        var arr = [];
        var len = end - start + 1;
        for (var i = start; i < len; i++) {
            var val = i;
            if (val < 10) {
                val = '0' + val
            } else {
                val = val.toString();
            }
            arr.push({
                label: val + unit,
                value: val
            })
        }
        return arr
    }

    function getTask() {
        var valuestr = JSON.stringify({
            openID: localStorage.openID,
        });
        ajax.ajaxPost('http://192.168.90.23:8079/baymin/gethabits', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0: //成功
                    actions = [];
                    $(res.data).each(function (idx, val) {
                        //{"id":2,"accountNumber":"0001","action":"洗澡","time":"7点"}
                        actions.push({
                            label: val.action,
                            value: val.id,
                            time: val.time
                        })
                        accountNumber = val.accountNumber;
                    });
                    renderPgaes();
                    break;
                default:
                    util.warningTip({
                        title: '获取养成时间列表失败',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    break;
            };
        }).catch(function (error) { });
    }

    function modifyTask(oldaction, oldtime, newaction, newtime) {
        var valuestr = JSON.stringify({
            accountNumber: accountNumber,
            action: oldaction,
            time: oldtime,
            newAction: newaction,
            newTime: newtime
        });
        ajax.ajaxPost('http://192.168.90.23:8079/baymin/updatehabit', {
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

    getTask();

    $(".task .check").click(function () {
        location.hash = "account";
    });
})