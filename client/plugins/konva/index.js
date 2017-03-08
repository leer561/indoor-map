import KonvaMap from './main'

function plugin(Vue) {
	if (plugin.installed) {
		return
	}
}

// 自行注册
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(plugin)
}

export default plugin