
import Router from 'vue-router'
import Home from '../application/home'

export default new Router({
	mode: 'hash',
	routes: [
		{path: '/',  redirect: '/home'},
		{path: '/home', component: Home},
	]
})
