import TYPES from './types'

export default {
	'selectCover': ({commit}, cover) => {
		commit(TYPES.SELECT_COVER, cover)
	}
}
