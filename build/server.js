const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev')
const config = require('./config')
const MOCKDATA = require('./mockData')
var _ = require('lodash')

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
app.get('/', (req, res) => {
	devMiddleWare.waitUntilValid(() => {
		const html = mfs.readFileSync(file)
		res.end(html)
	})
})

// 准备API
app.route('/api/v1/maps')
	.get((req, res, next) => {
		res.json(MOCKDATA.MAPS)
	})
app.route('/api/v1/maps/:id')
	.get((req, res, next) => {
		res.json(MOCKDATA.MAPS[0])
	})
// 轨迹点
app.route('/api/v1/tracks/:mapId')
	.get((req, res, next) => {
		res.json(MOCKDATA.TRACKS)
	})
// 实时数据点
app.route('/api/v1/realTime')
	.get((req, res, next) => {
		res.json(Array.from({length: 30}, () => {
			return {x: _.random(50, 1200), y: _.random(50, 1200)}
		}))
	})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
