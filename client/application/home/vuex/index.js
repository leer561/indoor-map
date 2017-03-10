const state = {
	covers: [],
	selectType: null
}

import mutations from './mutations'
import actions from './actions'

export default {
	namespaced: true,
	state: state,
	mutations: mutations,
	actions: actions
}
