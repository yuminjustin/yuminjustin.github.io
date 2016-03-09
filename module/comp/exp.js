define(function (require, exports, module) {
	var model = require("../model/exp"),
		view = require("../view/exp"),
		jq = require("jquery"),
		compent = {};
	compent.controller = function () {
		model.fetch();
	};
	compent.view = function () {
		return view(model);
	}
	return compent;
});