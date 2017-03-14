import Konva from 'konva'
import * as CONFIG  from './config'
import KonvaMain from './main'
import * as UTILS  from './utils'

export default class KonvaPlayBack extends KonvaMain {
	constructor() {
		super()
		// 添加临时矩形与绘图层
		this.trackShape = null
		this.trackLayer = new Konva.Layer()
		this.stage.add(this.trackLayer)
	}

	// 绘制轨迹
	drawTracks(points) {
		let line = new Konva.Line({
			points: points,
			stroke: 'blue',
			strokeWidth: 6,
			lineCap: 'round',
			lineJoin: 'round',
			dash: [29, 20, 0.001, 20]
		})
		this.trackLayer.add(line)
		this.trackLayer.draw()
	}
}


