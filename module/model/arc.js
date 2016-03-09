define(function (require, exports, module) {
	var m = require("mithril"),
		tool = require("coms/tool"),
		index = { /*数据处理*/
			url: APP.ACTION.arc,
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
			fetch: function (data) {
				var t = index
				m.request({
					method: "GET",
					url: t.url+"/"+data.channel+"/"+data.id+".json",
				}).then(function (data) { //返回值
					t.sync(data.data);
				});
			}
		};
	module.exports = index;
});