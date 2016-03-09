define(function (require, exports, module) {
	var m = require("mithril"),
		list = require("./index/list"),
		index = function (vm) {
			return m("ul", {
				class: "acrlist c lil m oh"
			}, [list(vm)]);
		};

	module.exports = index;
});