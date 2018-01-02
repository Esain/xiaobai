var env = require('./env');
var constants = function(){
    // this.WEI_XIN_APP_ID="wx51a5c782ec7c6ecc";
    // this.WEI_XIN_APP_ID="wxb00577c81c47eecd";
	// this.WEI_XIN_SECRET="1906a54e388e3ced32d303c456fbe60d";
    //this.WEI_XIN_SECRET="1931d1d4fdaa1148997ceb209f9d64a8";
    // this.WEI_XIN_TOKEN="yangyixin123";
    // this.WEI_XIN_TOKEN="a920216b72f262701d3bcc4a6df727d6";
    // this.WEI_XIN_ACCOUNT="";

    this.ACCESS_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+env.WEI_XIN_APP_ID+"&secret="+env.WEI_XIN_SECRET;
	this.TICKET_URL= "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi";
	this.MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=";
	this.SEND_ASYN_URL = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";
	this.UPLOAD_MEDIA = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=";

	this.STATISTICS_GETLIST="https://api.weixin.qq.com/customservice/msgrecord/getrecord?access_token=";
	this.CUST_SERV_GETLIST = "https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=";
	this.CUST_SERV_GETONLINELIST = "https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?access_token=";

	this.GET_MEDIA = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=";
	
	this.PAGE_SIZE=50;
}
var obj  = new constants();
module.exports = obj;
