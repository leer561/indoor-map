// real-time page store, namespace: 'realTime/' not merge

const state = {
	covers: [],
}

import mutations from './mutations'
import actions from './actions'

export default {
	namespaced: true,
	state: state,
	mutations: mutations,
	actions: actions
}
