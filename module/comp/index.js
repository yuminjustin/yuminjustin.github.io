define(function (require, exports, module) {
	var model = require("../model/index"),
		view = require("../view/index"),
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