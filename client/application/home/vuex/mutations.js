import * as TYPES from '../../../vuex/constants'

export default {
	[TYPES.OUTPUT_COVER]: (state, data) => state.covers.push(data),
	[TYPES.DELETE_COVER]: (state, cover) => state.covers.splice(_.indexOf(state.covers,cover),1)
}
