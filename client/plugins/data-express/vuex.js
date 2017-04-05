
import * as TYPES from '../../vuex/constants'

//mutations
const mutations = {
	[TYPES.RECEIVE]: (state, message) => state[message.topic] = message.data
}

//actions
const actions = {
	'receive': ({commit}, message) => commit(TYPES.RECEIVE, message)
}

const store = {
	state: {},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

const plugin = function (dataExpress) {
	return (store) => {
		dataExpress.onMessageArrived = (message) => {
			console.log('store', store)
			let data = null
			try {
				data = JSON.parse(message.payloadString)
			} catch (e) {
				console.warn('mqtt json化数据解析失败', message.payloadString)
				data = message.payloadString
			}

			store.dispatch('dataExpress/receive', {
				topic: message.destinationName,
				data
			})
		}
	}
}

export {store, plugin}

