(function () {
    $('#gender').on('click', function () {
        weui.picker([{
            label: '男孩',
            value: 0
        }, {
            label: '女孩',
            value: 1
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $('#gender .val').html(result[0].label)
            }
        });
    });
    $('#family').on('click', function () {
        weui.picker([{
            label: '爸爸',
            value: 0
        }, {
            label: '妈妈',
            value: 1
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $('#family .val').html(result[0].label)
            }
        });
    });
    $('#age').on('click', function () {
        weui.datePicker({
            start: new Date().getFullYear() - 5,
            end: new Date().getFullYear(),
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $('#age .val').html(result[0].label+result[1].label+result[2].label)
            }
        });
    });
})()
