import TYPES from './types'

export default {
	'deleteCover': ({commit}, cover) => {
		commit(TYPES.DELETE_COVER, cover)
	}
}
