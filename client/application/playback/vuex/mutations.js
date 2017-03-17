import * as TYPES from '../../../vuex/constants'

export default {
	[TYPES.SELECT_MAP]: (state, map) => state.selectedMap = map,
	[TYPES.SELECT_TRACK]: (state, track) => state.selectedTrack = track
}
