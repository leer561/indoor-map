import DataExpress from './main'

function plugin(Vue) {
	if (plugin.installed) {
		return
	}
	Vue.dataExpress = new DataExpress()
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(plugin)
}

export default plugin