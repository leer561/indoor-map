const state = {
	covers: [],
	selectedType: null,
	showDelete:null,
	selectedMap:null,
	maps:[]
}

import mutations from './mutations'
import actions from './actions'

export default {
	namespaced: true,
	state: state,
	mutations: mutations,
	actions: actions
}
