define(function (require, exports, module) {
    var m = require("mithril"),
        index = require("comp/index"),
		menu = require("comp/menu"),
		exp = require("comp/exp"),
        arc = require("comp/arc"),
        Route = {
            "/": index,
			"/plugin": index,
			"/experience": exp,
            "/arc/:arcid/:channel": arc
        },
		menuDom = document.getElementById("js-menu"),
		rightBar = document.querySelectorAll(".rightbar")[0];
	/*绑定路由*/
    m.route(document.getElementById("container"), "/", Route);
	m.mount(menuDom,menu);
	rightBar.style.width = window.innerWidth-128+"px";
	window.onresize = function(){
		rightBar.style.width = window.innerWidth-128+"px";
	}
});