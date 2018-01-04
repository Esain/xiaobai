define(['p','common'], function (p, util) {
	var postServer = '/';
	return {
		ajaxPost: function(url, param){
			var ajaxOpt = {
				type: 'POST',
				url: url,
				data: JSON.string(param)
			}
			return this.ajax(ajaxOpt)
		},
		ajaxGet: function(url, param){
			var ajaxOpt = {
				type: 'GET',
				url: url,
				data: param
			}
			return this.ajax(ajaxOpt);
		},
		ajax: function(ajaxOpt){
			var myPromise = Promise || p;
		
			return new myPromise(function(resolve, reject){
				var postUrl = ajaxOpt.url;
				if(ajaxOpt.url.indexOf('http') == -1){
					postUrl = postServer + postUrl.url;
				}
				var defaultOpt = {
					 	url: postUrl,
					  	success: success,
					  	error: error,
					  	complete: complete,
					  	beforeSend: beforeSend,
					  	contentType:'application/json',
					  	// headers: {
					  	// 	'token': token
					  	// },
					  	timeout: 8000
					}
				ajaxOpt = $({}, defaultOpt, ajaxOpt);

				$.ajax(ajaxOpt);
				
				function success(data){
					
					if(data.code == 0|| data.code == null){
						resolve(data.data);
					}else if(data.code == -1){
						reject(data.message);
						t.loginErrPage();
					}else{
						util.warningTip({
							title: '错误信息',
							context:data.message,
						});
						reject(data.message);
					}
				}
				function error(XMLHttpRequest, textStatus){
					util.warningTip({
						title: '错误信息',
						context: '网络异常,请稍后再试',
					});
					
					reject(JSON.stringify(XMLHttpRequest));
				}
				function complete(){
					// $('.inline-loading').remove();
				}
				function beforeSend(){
					// $('body').loading();
				}
			});
		}
	}
});