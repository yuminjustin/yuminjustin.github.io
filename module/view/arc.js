define(function (require, exports, module) {
	var m = require("mithril"),
		content = require("./arc/content"),
		arc = function (vm) {
			return m("div", {
				class: "m c article-body oa",
				id: "article-body"
			}, [content.init(vm)]);
		};

	module.exports = arc;
});