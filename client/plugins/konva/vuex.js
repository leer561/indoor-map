import * as TYPES from '../../vuex/constants'

// 对于模块内的 mutation 和 getter，接收的第一个参数是 模块的本地状态，而不是总的根状态。
const mutations = {
	[TYPES.OUTPUT_COORDINATE]: (state, data) => {
		state.outputCoordinate.push(data)
	}
}

const actions = {
	outputCoordinate: ({commit}, data) => {
		commit(TYPES.OUTPUT_COORDINATE, data)
	}
}

const store = {
	state: {
		outputCoordinate: []
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