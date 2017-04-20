import * as TYPES from '../../../vuex/constants'
import findIndex from 'lodash/findIndex'

export default {
	[TYPES.OUTPUT_COVER]: (state, data) => state.covers.push(data),
	[TYPES.DELETE_COVER]: (state, cover) => state.covers.splice(_.indexOf(state.covers, cover), 1),
	[TYPES.SELECT_TYPE]: (state, type) => state.selectedType = type,
	[TYPES.SHOW_DELETE]: (state, data) => state.showDelete = data,
	[TYPES.SELECT_MAP]: (state, map) => state.selectedMap = map,
	[TYPES.CLEAR_COVERS]: state => {
		if (!state.covers.length) return
		state.covers.splice(0, state.covers.length)
	},
	[TYPES.UPDATE_MAP]: (state, map) => {
		let index = findIndex(state.maps, item => item.id === map.id)
		if (index === -1) return
		state.maps[index] = map
	},
	[TYPES.GET_MAPS]: (state, maps) => {
		state.maps = []
		state.maps.push(...maps)
	}
}
