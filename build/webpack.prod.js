const exec = require('child_process').execSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const base = require('./webpack.base')
const config = require('./config')
const fp = require('lodash/fp')

if (config.electron) {
	// remove dist folder in electron mode
	exec('rm -rf app/assets/')
} else {
	// remove dist folder in web app mode
	exec('rm -rf dist/')
	// use source-map in web app mode
	base.devtool = 'source-map'
}

// set vendor jquery first
let vendor = fp.reject(item => item === 'jquery' || item === 'bootstrap')(config.vendor)
// a white list to add dependencies to vendor chunk
base.entry.vendor = vendor
// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
// add webpack plugins
base.plugins.push(
	new ProgressBarPlugin(),
	new ExtractTextPlugin('[name].[contenthash:8].css'),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: true
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: true
		},
		output: {
			comments: false
		},
		sourceMap: false
	}),
	// extract vendor chunks
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.[chunkhash:8].js'
	}),
	//处理VUE单文件组件的内置CSS
	new webpack.LoaderOptionsPlugin({
		vue: {
			postcss: config.postcss
		}
	})
)

//add loaders
base.module.rules.push(
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		options: {
			//处理VUE单文件组件的外链CSS文件
			postcss: config.postcss,
			loaders: {
				css: ExtractTextPlugin.extract({
					fallbackLoader: 'vue-style-loader',
					loader: [
						'css-loader',
						'postcss-loader'
					],
				}),
				scss: ExtractTextPlugin.extract({
					fallbackLoader: 'vue-style-loader',
					loader: [
						'css-loader',
						'postcss-loader',
						{
							loader: 'sass-loader'
						}
					],
				}),
				sass: ExtractTextPlugin.extract({
					fallbackLoader: 'vue-style-loader',
					loader: [
						'css-loader',
						'postcss-loader',
						{
							loader: 'sass-loader'
						}
					],
				}),
				js: 'babel-loader'
			}
		}
	},
	{
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract({
			fallbackLoader: 'style-loader',
			loader: [
				'css-loader',
				'postcss-loader',
				{
					loader: 'sass-loader'
				}
			],
		})
	},
	{
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallbackLoader: 'style-loader',
			loader: [
				'css-loader',
				'postcss-loader'
			],
		})
	}
)

module.exports = base
