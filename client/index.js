//Normalize.css
import './css/index.scss'

// use plugin
import Vue from 'vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(vueResource)

import konva from './plugins/konva'
Vue.use(konva)

import {sync} from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './vuex/store'
sync(store, router)

const app = new Vue({
	el: '#app',
	router,
	store,
	...App
})

export {app, router, store}
