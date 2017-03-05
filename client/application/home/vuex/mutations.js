import TYPES from './types'

export default {
	[TYPES.SELECT_COVER]: (state, cover) => {
		state.covers.push(cover)
	}
}
