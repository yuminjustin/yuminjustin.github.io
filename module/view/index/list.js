define(function (require, exports, module) {
	require("lazyload");
	var m = require("mithril"),
		list = {
			init: function (vm) {
				return list.liMaker(vm);
			},
			liMaker: function (vm) {
				var reArr = [],
					lazyload = function (element, isInit, context) { /*lazy*/
						$("img.lazy,.ab-p img").lazyload({
							placeholder: "/resource/img/grey.jpg",
							effect: "fadeIn"
						});
					};
				vm.collection.map(function (model, index) {
					var img = m("img", {
							src: model.img(),
							alt: model.title()
						}),
						p = m("p", {
							class: "ellipsis"
						}, model.title()),
						p2 = m("p", model.title()),
						span = m("span", model.description()),
						div = m("div", {
							class: "inner " + model.type()
						}, [p2, span]);
					reArr.push(m("li", {
						onclick: function () {
							var channel = (location.search=="?/"||location.search=="?/plugin")?"arc":"exp";
							location.search = "?/arc/arcid:" + model.tid()+"/channel:"+channel;
						},
						config: lazyload
					}, [img, p, div]));
				})
				return reArr;
			}
		}
	module.exports = list.init;
});