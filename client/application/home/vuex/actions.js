import * as TYPES from '../../../vuex/constants'

export default {
	'outputCover': ({commit}, data) => commit(TYPES.OUTPUT_COVER, data),
	'deleteCover': ({commit}, cover) => commit(TYPES.DELETE_COVER, cover),
	'selectType': ({commit}, type) => commit(TYPES.SELECT_TYPE, type),
	'showDelete': ({commit}, data) => commit(TYPES.SHOW_DELETE, data),
	'selectMap': ({commit}, map) => commit(TYPES.SELECT_MAP, map),
	'clearCovers': ({commit}) => commit(TYPES.CLEAR_COVERS)
}
