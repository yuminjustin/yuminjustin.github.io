define(function (require, exports, module) {
	var m = require("mithril"),
		index = { /*数据处理*/
			url: APP.ACTION.list,
			prop: m.prop(""),
			/*对象集合 普通数组*/
			collection: [],
			model: function (data) { /*单个对象*/
				for(var i in data){
					this[i] = m.prop(data[i]);
				}
			},
			sync: function (data) { /*同步数据*/
				var t = index;
				if (data) t.collection.push(new t.model(data));
			},
			/*添加*/
			add: function () {},
			/*删除*/
			del: function (model) {},
			fetch: function () {
				var t = index;
				m.request({
					method: "GET",
					url: t.url,
				}).then(function (data) { /*返回值*/
					for (var i = 0, l = data.data.list.length; i < l; i++) {
						t.sync(data.data.list[i]);
					}
				});
			}
		};
	module.exports = index;
});