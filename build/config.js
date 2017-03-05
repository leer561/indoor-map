const pkg = require('../package')

module.exports = {
	port: 4000,
	title: '室内导航',
	vendor: Object.keys(pkg.dependencies),
	postcss: [
		require('autoprefixer')({
			// Vue does not support ie 8 and below
			browsers: ['last 2 versions', 'ie > 8']
		}),
		require('postcss-nested')(),
		require('cssnano')()
	],
	cssModules: false,
	paths:{
		assets:'../client/css'
	}
}
