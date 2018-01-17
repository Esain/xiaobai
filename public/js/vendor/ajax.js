define(['p', 'common'], function (p, util) {
	var postServer = 'http://47.52.238.90:8079/';
	return {
		ajaxPost: function (url, param) {
			var ajaxOpt = {
				type: 'POST',
				url: url,
				data: param
			}
			return this.ajax(ajaxOpt)
		},
		ajaxGet: function (url, param) {
			var ajaxOpt = {
				type: 'GET',
				url: url,
				data: param
			}
			return this.ajax(ajaxOpt);
		},
		ajax: function (ajaxOpt) {
			var myPromise = Promise || p;

			return new myPromise(function (resolve, reject) {
				var postUrl = ajaxOpt.url;

				var defaultOpt = {
					url: postUrl,
					success: success,
					error: error,
					complete: complete,
					beforeSend: beforeSend,
					// contentType:'application/json',
					// headers: {
					// 	'token': token
					// },
					timeout: 8000
				}
				ajaxOpt = $.extend({}, defaultOpt, ajaxOpt);

				if (ajaxOpt.url.indexOf('http') == -1) {
					postUrl = postServer + ajaxOpt.url;
					ajaxOpt.url = postUrl;
				}

				$.ajax(ajaxOpt);

				function success(data) {
					if (data.msg) {
						resolve(data);
					} else {
						util.warningTip({
							title: '错误信息',
							context: '网络异常,请稍后再试',
							cb: function () {
								WeixinJSBridge.call('closeWindow');
							}
						});
						reject(data.message);
						// t.loginErrPage();
					}
				}
				function error(XMLHttpRequest, textStatus) {
					util.warningTip({
						title: '错误信息',
						context: '网络异常,请稍后再试',
						cb:function() {
							// WeixinJSBridge.call('closeWindow');
							WeixinJSBridge.invoke('closeWindow', {}, function (res) {
								console.log(res.err_msg);
							});
						}
					});
					reject(JSON.stringify(XMLHttpRequest));
				}
				function complete() {
					// $('.inline-loading').remove();
				}
				function beforeSend() {
					// $('body').loading();
				}
			});
		}
	}
});