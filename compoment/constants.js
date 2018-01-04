var env = require('./env');
var constants = function () {

	this.POST_HOST = "https://api.weixin.qq.com/"

	this.ACCESS_URL = `${this.POST_HOST}cgi-bin/token?grant_type=client_credential&appid=${env.WEI_XIN_APP_ID}&secret=${env.WEI_XIN_SECRET}`;
	this.TICKET_URL = `${this.POST_HOST}cgi-bin/ticket/getticket?type=jsapi`;
	this.MENU_URL = `${this.POST_HOST}cgi-bin/menu/create?access_token=`;
	this.SEND_ASYN_URL = `${this.POST_HOST}cgi-bin/message/custom/send?access_token=`;
	this.UPLOAD_MEDIA = `${this.POST_HOST}cgi-bin/media/upload?access_token=`;

	this.STATISTICS_GETLIST = `${this.POST_HOST}customservice/msgrecord/getrecord?access_token=`;
	this.CUST_SERV_GETLIST = `${this.POST_HOST}cgi-bin/customservice/getkflist?access_token=`;
	this.CUST_SERV_GETONLINELIST = `${this.POST_HOST}cgi-bin/customservice/getonlinekflist?access_token=`;

	this.GET_MEDIA = `${this.POST_HOST}cgi-bin/media/get?access_token=`;

	this.PAGE_SIZE = 50;

	this.AUTH_URL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env.WEI_XIN_APP_ID}&redirect_uri=${encodeURIComponent(env.REDIRECT_URI)}&response_type=code&scope=snsapi_base&state=test11#wechat_redirect`;
	
	this.getAuthAccessUrl = function (code) {
		return `${this.POST_HOST}sns/oauth2/access_token?appid=APPID&secret=SECRET&code=${code}&grant_type=authorization_code`;
	}
}
var obj = new constants();
module.exports = obj;
