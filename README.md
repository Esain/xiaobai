# xiaobai微信公众号
nodejs做为服务器，实现了接口转发，获取openID和token，初始化公众号菜单栏，自动拉取静态页面代码

# 启动
pm2 --name="xiaobai" start server.js

# 更新静态页面
endpoint/push.js监听gitlab的push事件，如果事件的请求人为Esain/penney，执行 deploy.sh 拉取代码

