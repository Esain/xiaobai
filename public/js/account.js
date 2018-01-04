require([
    'require',
    'ajax'
], function(require, ajax) {
    ajax.ajaxGet('test')
        .then(function (data) {
            alert(data);
        });
    
});