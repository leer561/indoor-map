const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev')
const config = require('./config')
const proxy = require('http-proxy-middleware')
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

// // 设置求请转发
const apiProxy1 = proxy('/weidian/**', {target: 'http://192.168.1.12:3000', changeOrigin: true})
app.use('/weidian', apiProxy1)
const apiProxy2 = proxy('/api/**', {target: 'http://192.168.1.12:3000', changeOrigin: true})
app.use('/api', apiProxy2)

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
