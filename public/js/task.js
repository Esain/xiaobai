var setEvent = function () {
    var tpl = function (name) {
        return '<div class="weui-cell weui-cell_access" onclick="setTime(event)">\n' +
            '            <div class="weui-cell__bd">'+name+'</div>\n' +
            '            <div class="weui-cell__ft">\n' +
            '                <span class="val mr20"></span>\n' +
            '            </div>\n' +
            '        </div>'
    }
    weui.picker([{
        label: '起床',
        value: 0
    },{
        label: '睡觉',
        value: 1
    },{
        label: '讲故事',
        value: 2
    }], {
        onChange: function (result) {
        },
        onConfirm: function (result) {
            console.log(result);
            $('.main-panel').append(tpl(result[0].label))
        }
    });

}
var setTime = function (e) {
    var $this = $(e.target).closest('.weui-cell_access');
    weui.picker(getNumArr(0,24,'时'), getNumArr(0,59,'分'), {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                console.log(result);
                $this.find('.val').html(result[0].value+' : '+result[1].value+'提醒')
            }
        });

}
var getNumArr = function (start,end,unit) {
    var arr = [];
    var len = end - start +1;
    for(var i=start;i<len;i++){
        var val = i;
        if(val<10){
            val = '0'+val
        }else {
            val = val.toString();
        }
        arr.push({
            label: val+unit,
            value: val
        })
    }
    return arr
}
