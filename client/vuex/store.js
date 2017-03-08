import createLogger from 'vuex/dist/logger'
import Vue from 'vue'
import Vuex from 'vuex'

// use konva
import Konva from '../plugins/konva/main'
import * as konvaVuex from '../plugins/konva/vuex'

// pages and plugin Vuex
import home from '../application/home/vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		home,
		konva: konvaVuex.store
	},
	plugins: [createLogger(), konvaVuex.plugin(Konva)]
})

export default store
