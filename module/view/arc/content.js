define(function (require, exports, module) {
	require("prettify");
	require("qrcode");
	require("lazyload");
	var m = require("mithril"),
		tool = require("coms/tool"),
		content = {
			init: function (vm) {
				var t = this;
				t.data = vm.collection[0];
				var inner = t.bodyMaker();
				return m("div", {
					class: "m",
					config: t.pretty
				}, [inner]);
			},
			bodyMaker: function () {
				var t = this,
					arr = t.data.body(),
					htmlArr = [];
				for (var i = 0, l = arr.length; i < l; i++) {
					var temp = arr[i],
						ele;
					if (typeof (temp) == "string") {
						if (temp.indexOf("<") > -1) ele = t.html(temp);
						else ele = t.normal(temp, !i);
					} else ele = t.preMaker(temp)
					htmlArr.push(ele);
				}
				return m("div", {
					id: "article-part"
				}, htmlArr);
			},
			normal: function (str, idx) {
				var c = (idx) ? "c ab-p ab-p-first" : "c ab-p";
				return m("div", {
					class: c
				}, str);
			},
			html: function (str) {
				return this.normal(m.trust(str))
			},
			preMaker: function (data) {
				if (data.qrcode) {
					return this.normal(m("div", {
						class: "qrcode",
						"data-url": data.qrcode
					}));
				} else {
					var str = "";
					for (var i = 0, l = data.length; i < l; i++) {
						str += data[i] + " \n";
					}
					return this.normal(m("pre", {
						class: "prettyprint linenums"
					}, m.trust(str)));
				}
			},
			pretty: function (element, isInit, context) { /*google pretty qrcode lazy*/
				var qrcode = $(element).find(".qrcode");
				prettyPrint();
				$(".qrcode").each(function () {
					$(this).qrcode($(this).data("url"));
				});
				$("img.lazy,.ab-p img").lazyload({
					placeholder: "/resource/img/grey.jpg",
					effect: "fadeIn"
				});
				content.titleView();
			},
			titleView: function () { /*显示标题*/
				var dom = $("#article-head .ab-title-info")[0],
					p = m("p", {
						class: "ab-title"
					}, this.data.title()),
					span = m("span", {
						class: "db"
					}, this.data.updateTime()),
					cl = tool.splitValue("channel", m.route.param("channel")),
					href = (cl=="exp")?"experience":"plugin";
				dom.innerHTML = "";
				m.render(dom, [p, span]);
				$("#article-head").show();
				$("#article-head a").attr("href","?/"+href);
			}
		};

	module.exports = content;
});