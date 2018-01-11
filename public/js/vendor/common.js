define(function() {
    var util = {};

    util.getCountDown = function(fn) {
        var CountDown = {};
        CountDown.count = 60;
        CountDown.start = function() {
            var self = CountDown;
            self._a = setTimeout(function() {
                if (self.count === 0) {
                    self.count = 60
                    fn('获取验证码', false);
                } else {
                    self.start()
                    self.count--
                        fn(self.count + '秒', true);
                }
            }, 1000)
        }

        CountDown.reset = function() {
            CountDown.count = 60;
            clearTimeout(CountDown._a);
            fn('获取验证码', false)
        }

        return CountDown;
    }

    var _index = 0;
    util.warningTip = function(opt) {
        var defaultOpt = {
            title: '提示信息',
            context: '',
        }

        opt = $.extend({}, defaultOpt, opt)
        _index++;

        var $tpl = $('<div class="weui-tips">\
				        <div class="weui-mask"></div>\
				        <div class="weui-dialog">\
				            <div class="weui-dialog__hd"><strong class="weui-dialog__title">' +
            opt.title +
            '</strong></div>\
				            <div class="weui-dialog__bd">' +
            opt.context +
            '</div>\
				            <div class="weui-dialog__ft">\
				                <a class="weui-dialog__btn weui-dialog__btn_primary">确定</a>\
				            </div>\
				        </div>\
				    </div>');
        $tpl.data('index', _index);

        $tpl.find('.weui-dialog__btn').on('click', function(e) {
            opt.cb && opt.cb(e);
            util.tipsOff(e);
            $tpl.remove();
            $tpl = null;
        });

        $("body").append($tpl);
    }
    // util.warningTip({ title: '托尔斯泰', context: '时时时时时时s', cb: function() { cosole.log(1) } })

    util.tipsOff = function tipsOff(e) {
        var self = $(e.target).closest('.weui-tips').addClass('hide')
    }


    return util;
})