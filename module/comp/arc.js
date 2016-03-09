define(function (require, exports, module) {
	var m = require("mithril"),
		tool = require("coms/tool"),
		model = require("../model/arc"),
		view = require("../view/arc"),
		compent = {};
	compent.controller = function () {
		model.fetch({
			id: tool.splitValue("arcid", m.route.param("arcid")),
			channel: tool.splitValue("channel", m.route.param("channel")),
		});
	};
	compent.view = function () {
		return view(model);
	}
	return compent;
});