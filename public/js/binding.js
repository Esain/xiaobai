//写cookies
var login = function () {
    var acountNum = $('.account-num').val();
    var mobile = $('.account-mobile').val();
    var vcode = $('.vcode').val;
    if(acountNum && mobile && vcode){
        setCookie('account','kdc-test')
        location.hash = 'baby/info';
    }else {
        $('.weui-tips').removeClass('hide');
    }
}
