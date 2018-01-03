var stamp = randomString(10);
requirejs.config({
    urlArgs:'v=' + stamp,
    baseUrl: 'js/vendor',
    paths:{
        'spa': 'spa',
        'weui': 'weui',
        'fastclick': 'fastclick',
        'zepto': 'zepto.min',
        'common': 'common',
        'cookie': 'cookie',
        'p': 'promise.polyfill',
        'ajax': 'ajax'
    }
});

function randomString(len) {
　　len = len || 32;
　　var $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　};
　　return pwd;
};

require(['spa','fastclick', 'zepto'], function(vipspa, FastClick, $) {
     $(function() {
            FastClick.attach(document.body);
        });
          
    vipspa.start({
        view: '#ui-view',
        router: {
            '': {
                templateUrl: 'js/tpl/account.html',
                controller: 'js/account.js?v=' + stamp,
                requireAuth: false,
                title: '用户设置'
            },
            'binding': {
                templateUrl: 'js/tpl/binding.html',
                controller: 'js/binding.js?v=' + stamp,
                requireAuth: false,
                title: '绑定账号'
            },
            'babyInfo': {
                templateUrl: 'js/tpl/baby-info.html',
                controller: 'js/baby-info.js?v=' + stamp,
                requireAuth: false,
                title: '宝宝信息'
            },
            'task': {
                templateUrl: 'js/tpl/task.html',
                controller: 'js/task.js?v=' + stamp,
                requireAuth: false,
                title: '任务设置'
            },
            'defaults': '' //默认路由
        },
        errorTemplateId: '#error' //可选的错误模板，用来处理加载html模块异常时展示错误内容
    });

});