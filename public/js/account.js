require([
    'require',
    'ajax',
    'md5'
], function(require, ajax,md5) {
    ajax.ajaxGet('test')
        .then(function (data) {
            alert(data);
        });
});