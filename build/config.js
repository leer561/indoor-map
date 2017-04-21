const pkg = require('../package')

module.exports = {
	port: 4000,
	title: '微店室内定位项目',
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
