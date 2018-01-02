$(function(){

    vipspa.start({
        view: '#ui-view',
        router: {
            'account': {
                templateUrl: 'js/tpl/account.html',
                controller: 'js/account.js',
                requireAuth:true
            },
            'binding': {
                templateUrl: 'js/tpl/binding.html',
                controller: 'js/binding.js',
                requireAuth:true
            },
            'baby/info': {
                templateUrl: 'js/tpl/baby-info.html',
                controller: 'js/baby-info.js',
                requireAuth:true
            },
            'task': {
                templateUrl: 'js/tpl/task.html',
                controller: 'js/task.js',
                requireAuth:true
            },
            'defaults': 'binding' //默认路由
        },
        errorTemplateId: '#error'  //可选的错误模板，用来处理加载html模块异常时展示错误内容
    });

});
