const path = require('path')
const config = require('./config')

const _ = module.exports = {}

_.outputPath = config.electron ?
	path.join(__dirname, '../app/dist') :
	path.join(__dirname, '../dist')

_.outputIndexPath = config.electron ?
	path.join(__dirname, '../app/dist/index.html') :
	path.join(__dirname, '../dist/index.html')

_.target = config.electron ? 'electron-renderer' : 'web'
