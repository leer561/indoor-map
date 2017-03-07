import KonvaMap from './main'

function plugin(Vue) {
	if (plugin.installed) {
		return
	}
	Vue.Konva = KonvaMap
	Vue.directive('konva', {
		inserted: function (el, binding, vnode) {
			let konva = new KonvaMap()
			konva.addBackGroundImg()
			konva.bindEvents()
		}
	})
}

// 自行注册
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(plugin)
}

export default plugin