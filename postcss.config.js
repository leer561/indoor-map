module.exports = {
	plugins: {
		'autoprefixer': {
			// Vue does not support ie 8 and below
			browsers: ['last 2 versions', 'ie > 8']
		},
		'postcss-nested': {},
		'cssnano':{}
	}
}
