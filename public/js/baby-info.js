require(['zepto', 'weui'], function($, weui) {
    $('#gender').on('click', function() {
        weui.picker([{
            label: '小王子',
            value: 0
        }, {
            label: '小公主',
            value: 1
        }], {
            onChange: function(result) {},
            onConfirm: function(result) {
                $('#gender .val').html(result[0].label)
            }
        });
    });
    $('#family').on('click', function() {
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
            onChange: function(result) {},
            onConfirm: function(result) {
                $('#family .val').html(result[0].label)
            }
        });
    });
    $('#age').on('click', function() {
        weui.datePicker({
            start: new Date().getFullYear() - 5,
            end: new Date().getFullYear(),
            onChange: function(result) {},
            onConfirm: function(result) {
                $('#age .val').html(result[0].label + result[1].label + result[2].label)
            }
        });
    });
})