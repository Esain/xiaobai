$(function(){

    vipspa.start({
        view: '#ui-view',
        router: {
            'account': {
                templateUrl: 'js/tpl/account.html',
                controller: 'js/account.js',
                requireAuth:false,
                title: '用户设置'
            },
            'binding': {
                templateUrl: 'js/tpl/binding.html',
                controller: 'js/binding.js',
                requireAuth:false,
                title: '绑定账号'
            },
            'babyInfo': {
                templateUrl: 'js/tpl/baby-info.html',
                controller: 'js/baby-info.js',
                requireAuth:false,
                title: '宝宝信息'
            },
            'task': {
                templateUrl: 'js/tpl/task.html',
                controller: 'js/task.js',
                requireAuth:false,
                title: '任务设置'
            },
            'defaults': 'binding' //默认路由
        },
        errorTemplateId: '#error'  //可选的错误模板，用来处理加载html模块异常时展示错误内容
    });

});
