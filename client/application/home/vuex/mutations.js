import * as TYPES from '../../../vuex/constants'

export default {
	[TYPES.OUTPUT_COVER]: (state, data) => state.covers.push(data),
	[TYPES.DELETE_COVER]: (state, cover) => state.covers.splice(_.indexOf(state.covers, cover), 1),
	[TYPES.SELECT_TYPE]: (state, type) => state.selectedType = type,
	[TYPES.SHOW_DELETE]: (state, data) => state.showDelete = data,
	[TYPES.SELECT_MAP]: (state, map) => state.selectedMap = map,
	[TYPES.CLEAR_COVERS]: state => {
		if (!state.covers.length) return
		state.covers.splice(0, state.covers.length)
	}
}
