import * as TYPES from '../../../vuex/constants'

export default {
	'outputCover': ({commit}, data) => commit(TYPES.OUTPUT_COVER, data),
	'deleteCover': ({commit}, cover) => commit(TYPES.DELETE_COVER, cover),
	'selectType': ({commit}, type) => commit(TYPES.SELECT_TYPE, type),
}
