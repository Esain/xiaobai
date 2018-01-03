require(['zepto','weui'], function($, weui){
    var actions = [{
        label: '起床',
        value: 0
    },{
        label: '睡觉',
        value: 1
    },{
        label: '讲故事',
        value: 2
    }]

    function renderPgaes() {
        actions.forEach(function(item){
            var tpl = getTpl(item)

            $('.task').find('.main-panel').append(tpl);
        }); 

        $('.main-panel').on('click', '.weui-cell', function(e){
            setTime(e);

        });
    }

    var getTpl = function (item) {
        return '<div class="weui-cell weui-cell_access" data-type="'+ item.value +'">\n' +
            '            <div class="weui-cell__bd">'+item.label+'</div>\n' +
            '            <div class="weui-cell__ft">\n' +
            '                <span class="val mr20"></span>\n' +
            '            </div>\n' +
            '        </div>'
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

    renderPgaes();
})