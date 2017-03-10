import * as TYPES from '../../vuex/constants'

// 对于模块内的 mutation 和 getter，接收的第一个参数是 模块的本地状态，而不是总的根状态。
const mutations = {
	[TYPES.OUTPUT_COORDINATE]: (state, data) => {
		state.coordinate.push(data)
	},
	[TYPES.DELETE_COVER]: (state, cover) => {
		_.remove(state.coordinate, cover)
	}
}

const actions = {
	outputCoordinate: ({commit}, data) => {
		commit(TYPES.OUTPUT_COORDINATE, data)
	},
	'deleteCover': ({commit}, cover) => {
		commit(TYPES.DELETE_COVER, cover)
	}
}

const store = {
	state: {
		coordinate: []
	},
	actions,
	mutations
}

// 使用类的静态方法 完成数据添加
const plugin = function (Konva) {
	return store => {
		Konva.output = coordinate => {
			store.commit(TYPES.OUTPUT_COORDINATE, coordinate)
		}
	}
}

export {store, plugin}