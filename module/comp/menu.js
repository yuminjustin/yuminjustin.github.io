define(function (require, exports, module) {
	var m = require("mithril"),
		model = require("model/menu"),
		compent = {};
	compent.controller = function () {
		model.fetch();
	};
	compent.view = function () {
		var list = [];
		model.collection.map(function (model, index) {
			var search = (function () {
					var re = "";
					if (location.search == model.url()) re = " active";
					else if (location.search == "?/" && index == 1) re = " active";
					return re;
				})(),
				inner = (model.inner()) ? m.trust(model.inner()) : model.title(),
				a = m("a", {
					href: model.url(),
					title: model.title()
				}, inner),
				li = m("li", {
					class: model.classname() + search
				}, [a]);
			list.push(li);
		})
		return list;
	}
	return compent;
});