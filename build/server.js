'use strict'
const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev')
const config = require('./config')

const app = express()

const port = config.port
webpackConfig.entry.client = [
	`webpack-hot-middleware/client?reload=true`,
	webpackConfig.entry.client
]

const compiler = webpack(webpackConfig)

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}
})
app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler))

const mfs = devMiddleWare.fileSystem
const file = path.join(webpackConfig.output.path, 'index.html')
app.get('/', (req, res) = > {
	devMiddleWare.waitUntilValid(() = > {
	const html = mfs.readFileSync(file)
	res.end(html)
})
})

//api
app.all('/api/*', (req, res) = > {
	res.json([
	{
		model: 'z-12',
		list: [
			{
				model: 'z-12',
				num: 'ZW1230',
				type: '多旋翼'
			},
			{
				model: 'z-12',
				num: 'ZW1231',
				type: '多旋翼'
			},
			{
				model: 'z-12',
				num: 'ZW1232',
				type: '多旋翼'
			}
		]
	},
	{
		model: 'z-11',
		list: [
			{
				model: 'z-11',
				num: 'ZW1230',
				type: '固定翼'
			},
			{
				model: 'z-11',
				num: 'ZW1231',
				type: '固定翼'
			},
			{
				model: 'z-11',
				num: 'ZW1232',
				type: '固定翼'
			}
		]
	}
])
})

app.listen(port, () = > {
	console.log(`Listening at http://localhost:${port}`)
})
