import * as TYPES from '../../vuex/constants'

// 对于模块内的 mutation 和 getter，接收的第一个参数是 模块的本地状态，而不是总的根状态。
const mutations = {
	[TYPES.OUTPUT_COORDINATE]: (state, data) => {
		state.outputCoordinate = data
	},
	[TYPES.CLEAR_GRAPH]: (state) => {
		state.selectGraph = null
	}
}

const actions = {
	outputCoordinate: ({commit}, data) => {
		commit(TYPES.OUTPUT_COORDINATE, data)
	},
	clearGraph: ({commit}) => {
		commit(TYPES.CLEAR_GRAPH)
	}
}

const store = {
	state: {
		selectGraph: null,
		outputCoordinate: {}
	},
	actions,
	mutations
}

// 使用类的静态方法 完成数据添加
const plugin = function (Konva) {
	return store => {
		Konva.output = coordinate => {
			store.commit(TYPES.OUTPUT_COORDINATE, {
				type: store.state.selectGraph,
				coordinate: coordinate
			})
			store.commit(TYPES.CLEAR_GRAPH)
		}
	}
}

export {store, plugin}