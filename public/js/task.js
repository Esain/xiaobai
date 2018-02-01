require(['zepto', 'weui', 'ajax', 'md5', 'common'], function ($, weui, ajax, md5, util) {
    var accountNumber;
    var actions = [];
    var changeActions = [];
    var isChange = false;

    function renderPgaes() {
        actions.forEach(function (item) {
            var tpl = getTpl(item)
            $('.task').find('.main-panel').append(tpl);
        });

        $('.main-panel').on('click', '.weui-cell', function (e) {
            // console.log($(this));
            var data = $(this).data('o-data');
            var oldaction = data.label;
            var oldtime = data.time;
            var id = data.value;
            setTime(oldaction, oldtime, e, id);
        });
    }

    var getTpl = function (item) {
        var timestr = "";
        if (item.time && item.time != null) {
            timestr = item.time + "提醒";
        }
        var $tpl = $('<div class="weui-cell weui-cell_access" data-type="' + item.value + '">\n' +
            '            <div class="weui-cell__bd">' + item.label + '</div>\n' +
            '            <div class="weui-cell__ft">\n' +
            '                <span class="val mr5">' + timestr + '</span>\n' +
            '            </div>\n' +
            '        </div>')
            $tpl.data('o-data', JSON.stringify(item));
        return $tpl;
    }



    var setTime = function (oldaction, oldtime, e, id) {
        var tmpTimeArr = oldtime.split(' : ');
        var $this = $(e.target).closest('.weui-cell_access');
        weui.picker(getNumArr(0, 24, '时'), getNumArr(0, 59, '分'), {
            id: 'picker' + id,
            defaultValue: tmpTimeArr,
            onChange: function (result) {
            },
            onConfirm: function (result) {
                isChange = true;
                $this.find('.val').html(result[0].value + ' : ' + result[1].value + '提醒');
                var newaction = $this.find(".weui-cell__bd").text();
                var newtime = $this.find(".weui-cell__ft span").text();
                newtime = (newtime + "").split("提醒")[0];
                // modifyTask(oldaction, oldtime, newaction, newtime);
                var t = $this.data('o-data');
                t.label = newaction;
                t.time = newtime;
                $this.data('o-data', JSON.stringify(t));
                // updateChangeActions(oldaction, oldtime, newaction, newtime)
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
        ajax.ajaxPost('baymin/gethabits', {
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

    // function modifyTask(oldaction, oldtime, newaction, newtime) {
    //     var valuestr = JSON.stringify({
    //         accountNumber: accountNumber,
    //         action: oldaction,
    //         time: oldtime,
    //         newAction: newaction,
    //         newTime: newtime
    //     });
    //     ajax.ajaxPost('baymin/updatehabit', {
    //         key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
    //         value: valuestr
    //     }).then(function (res) {
    //         switch (res.status) {
    //             case 0: //成功
    //                 localStorage.setItem("relation", brela);
    //                 localStorage.setItem("cname", bname);
    //                 localStorage.setItem("birthday", bage);
    //                 localStorage.setItem("sex", bsex);
    //                 break;
    //             default:
    //                 util.warningTip({
    //                     title: '设置宝宝信息失败',
    //                     context: res.msg,
    //                     cb: function () {
    //                     }
    //                 })
    //                 break;
    //         };
    //     }).catch(function (error) { });
    // }

    var submit = function(){
        changeActions.length = 0;
        $('.weui-cell').each(function(i, dom) {
            var data =  $(dom).data('o-data');
            changeActions.push({
                accountNumber: accountNumber,
                action: data.label,
                time: data.time
            });
        });

        var valuestr = JSON.stringify(changeActions);
        return ajax.ajaxPost('baymin/saveHabits', {
            key: md5("8d98b93a0d4e1777acb36d4404c61854" + valuestr),
            value: valuestr
        }).then(function (res) {
            switch (res.status) {
                case 0: //成功
                    return 1;
                    break;
                default:
                    util.warningTip({
                        title: '设置宝宝信息失败',
                        context: res.msg,
                        cb: function () {
                        }
                    })
                    throw new Error('设置失败');
                    break;
            };
        })
    }

    getTask();

    $(".task .check").click(function () {
        if (!isChange) {
            location.hash = "account";
            return
        }
        submit().then(function (params) {
            if (sessionStorage.getItem('isBindedEnd=="true"') && sessionStorage.getItem('isBinded=="true"')) {
                location.hash = "account";
            }else{
                sessionStorage.setItem("isBindedEnd", "true");
                util.warningTip({
                    title: '设置成功',
                    context: "用户设置已完成！",
                    cb: function () {
                        location.hash = "account";
                    }
                })
            }
        }).catch(function (error) { console.log(error)});;
    });
})