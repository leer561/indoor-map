const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
	entry: {
		client: './client/index.js'
	},
	output: {
		path: _.outputPath,
		filename: '[name].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.vue', '.css', '.json', '.scss'],
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]?[hash]'
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[ext]'
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			Vue: 'vue',
			Vuex: 'vuex',
			$: 'jquery',
			_: 'lodash'
		}),
		new HtmlWebpackPlugin({
			title: config.title,
			template: './client/index.html',
			filename: _.outputIndexPath
		})
	],
	target: _.target
}
