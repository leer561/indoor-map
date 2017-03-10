import TYPES from './types'

export default {
	[TYPES.DELETE_COVER]: (state, cover) => {
		_.remove(state.konva.coordinate, cover)
	}
}
