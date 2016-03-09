define(function (require, exports, module) {
	/*
	  更多工具直接使用underscore 此处是针对业务的方法
	*/
	var Tool = {
		splitValue: function (key, str, flag) { /*拆分键值对的字符串 可添加标识符*/
			return str.split(key + (flag || ":"))[1]
		},
		setHash: function (a, b) { /*设置hash*/
			var hash = location.hash;
			if (!hash) hash = "!";
			if (hash.match(new RegExp("(?:#|\/)" + a + ":(.*?)(?=\/|$)"))) {
				hash = hash.replace(new RegExp("(?:#|\/)" + a + ":(.*?)(?=\/|$)"), '/' + a + ":" + b);
			} else {
				hash += '/' + a + ":" + b;
			}
			location.hash = hash;
		},
		getHash: function (a) { /*获取hash*/
			var hash = location.hash.replace("!#", "");
			return (hash.match(new RegExp("(?:^|\/)" + a + ":(.*?)(?=\/|$)")) || ['', null])[1];
		},
		device: device,
		/*设备*/
		browser: browser,
		/*浏览器*/
		animatend: function (o, fn) { /*css3动画结束*/
			css3Events(o, "webkitAnimationEnd", fn);
			css3Events(o, "animationend", fn);
			css3Events(o, "MSAnimationEnd", fn);
		},
		transitionend: function (o, fn) { /*css3过渡结束*/
			css3Events(o, "webkitTransitionEnd", fn);
			css3Events(o, "transitionend", fn);
			css3Events(o, "MSTransitionEnd", fn);
		}
	}
	var css3Events = function (o, en, fn) {
			var b = browser();
			if (b.v > 9 || b.v == 0) {
				var aoff = function () {
					fn(o);
					o.removeEventListener(en, aoff, false);
				}
				o.addEventListener(en, aoff, false);
			} else fn(o);
		},
		device = function () {
			var ua = navigator.userAgent,
				name = "pc",
				v = 0;
			if (ua.match(/Android/i)) name = "an";
			else if (ua.match(/BlackBerry/i)) name = "bb";
			else if (ua.match(/iPhone|iPad|iPod/i)) name = "ios";
			else if (ua.match(/IEMobile/i)) name = "wp";
			else if (ua.match(/Mobile/i)) name = "other";
			else v = 1;
			return {
				name: name,
				v: v
			};
		},
		browser = function (fn) {
			var n = navigator,
				name, v = 0,
				ua = n.userAgent,
				d = device();
			if (!d.v) {
				name = d.name;
				if (name == 'an' && !(ua.indexOf('U;') > -1)) v = -1;
				return {
					name: name,
					v: v
				};
			}
			if (n.appName == "Netscape") {
				if (ua.indexOf("Chrome") > 0) name = 'chrome';
				else if (ua.indexOf("Safari") > 0) name = 'safari';
				if (ua.indexOf("Shuame") > 0) {
					name = 'ie';
					v = 11;
				}
				if (ua.indexOf("Edge") > 0) {
					name = 'edge';
					v = 12;
				}
				if (ua.indexOf("Firefox") > 0) name = 'firefox';
			} else {
				name = 'ie';
				if (ua.match(/MSIE 10.0/i) == "MSIE 10.0") v = 10;
				else if (ua.match(/MSIE 9.0/i) == "MSIE 9.0") v = 9;
				else if (ua.match(/MSIE 8.0/i) == "MSIE 8.0") v = 8;
				else if (ua.match(/MSIE 7.0/i) == "MSIE 7.0") v = 7;
				else if (ua.match(/MSIE 6.0/i) == "MSIE 6.0") v = 6;
				else v = 5;
			}
			return {
				name: name,
				v: v
			};
		}
	return Tool;
});