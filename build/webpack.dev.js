const webpack = require('webpack')
const base = require('./webpack.base')
const config = require('./config')

base.devtool = 'eval-source-map'
base.plugins.push(
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development')
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
)

//push loaders
base.module.rules.push(
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		options: {
			//处理VUE单文件组件的外链CSS文件
			postcss: config.postcss,
			loaders: {
				css: 'vue-style-loader!css-loader!postcss-loader',
				scss:'vue-style-loader!css-loader!postcss-loader!sass-loader',
				sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
				js: 'babel-loader'
			}
		}
	},
	{
		test: /\.scss$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader'
			},
			'postcss-loader',
			'sass-loader'
		]
	},
	{
		test: /\.css$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader'
			},
			'postcss-loader'
		]
	}
)

module.exports = base
