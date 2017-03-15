
import Router from 'vue-router'
import Home from '../application/home'
import Playback from '../application/playback'
import realTime from '../application/real-time'

export default new Router({
	mode: 'hash',
	routes: [
		{path: '/',  redirect: '/home'},
		{path: '/home', component: Home},
		{path: '/playback', component: Playback},
		{path: '/real-time', component: realTime}
	]
})
