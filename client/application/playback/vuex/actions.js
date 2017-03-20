import * as TYPES from '../../../vuex/constants'

export default {
	'selectMap': ({commit}, map) => commit(TYPES.SELECT_MAP, map),
	'selectTrack': ({commit}, data) => commit(TYPES.SELECT_TRACK, data)
}
