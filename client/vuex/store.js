import createLogger from 'vuex/dist/logger'
import Vue from 'vue'
import Vuex from 'vuex'

// pages and plugin Vuex
import home from '../application/home/vuex'
import playback from '../application/playback/vuex'
import realTime from '../application/real-time/vuex'

// dataExpress
import dataExpress from '../plugins/data-express'
Vue.use(dataExpress)
import * as dataExpressVuex from '../plugins/data-express/vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		home,
		playback,
		realTime,
		dataExpress: dataExpressVuex.store
	},
	plugins: [createLogger(), dataExpressVuex.plugin(Vue.dataExpress)]
})

export default store
