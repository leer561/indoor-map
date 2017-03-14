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
app.get('/', (req, res) => {
	devMiddleWare.waitUntilValid(() => {
		const html = mfs.readFileSync(file)
		res.end(html)
	})
})

// 准备API
app.route('/api/v1/maps/:id')
	.get((req, res, next) => {
		res.json([
			{
				name: "1489459354540",
				remark: "例如儿童商店一号厅",
				type: "rect",
				coordinate: [
					{
						x: 294,
						y: 235
					}, {
						x: 513,
						y: 380
					}
				]
			},
			{
				name: "1489459361628",
				remark: "例如儿童商",
				type: "circular",
				coordinate: {
					radius: 115,
					position: {
						x: 626,
						y: 333
					}
				}
			},
			{
				name: "1489459367093",
				remark: "童商店一号厅",
				type: "polygon",
				coordinate: [822, 468, 833, 530, 665, 544, 658, 490, 816, 435]
			}
		])
	})

app.route('/api/v1/tracks/:id')
	.get((req, res, next) => {
		res.json([5, 70, 140, 23, 250, 60, 300, 20, 60, 76, 22, 66, 123, 34])
	})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
