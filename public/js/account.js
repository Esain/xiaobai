require([
    'require',
    'ajax',
    'md5'
], function(require, ajax,md5) {
    ajax.ajaxGet('test')
        .then(function (data) {
            alert(data);
        });

    //查询宝宝信息
    
});