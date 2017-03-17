import createLogger from 'vuex/dist/logger'
import Vue from 'vue'
import Vuex from 'vuex'

// pages and plugin Vuex
import home from '../application/home/vuex'
import playback from '../application/playback/vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		home,
		playback
	},
	plugins: [createLogger()]
})

export default store
