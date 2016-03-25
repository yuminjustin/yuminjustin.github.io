requirejs.config({
	baseUrl: './',
	paths: {
		mithril: "module/lib/mithril.min",
		jquery: "module/lib/jquery.min",
		qrcode: "module/lib/jquery.qrcode.min",
		lazyload: "module/lib/jquery.lazyload.min",
		prettify: "module/lib/prettify.min",
		coms: "module/coms", //插件 
		comp: "module/comp", //组件
		model: "module/model", //model vm模型
		view: "module/view", //试图
		app: 'module/app' //入口
	},
	shim: {
		lazyload: {
			deps: ['jquery']
		},
		qrcode: {
			deps: ['jquery']
		}
	}
});

window.APP = {
	ACTION: { /*接口*/
		menu: "./data/menu.json",
		list: "./data/list.json",
		exp: "./data/exp.json",
		arc: "./data/"
	}
};