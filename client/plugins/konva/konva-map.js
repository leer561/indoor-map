import Konva from 'konva'
import * as CONFIG  from './config'
import KonvaMain from './main'

export default class KonvaMap extends KonvaMain{
	constructor() {
		super()

		// 添加遮罩图层
		this.coverLayer = new Konva.Layer({opacity: 0.5})

		// 添加临时矩形与绘图层
		this.moveRect = null
		this.moveLayer = new Konva.Layer({opacity: 0.5})

		this.stage.add(this.coverLayer)
		this.stage.add(this.moveLayer)
	}

	bindEvents() {
		// 监听事件
		this.stage.on('mousedown', () => {
			let pointStart = this.stage.getPointerPosition()
			this.moveRect = new Konva.Rect({
				x: pointStart.x,
				y: pointStart.y,
				width: 1,
				height: 1,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 1
			})
			this.moveLayer.add(this.moveRect)

			// 鼠标移动
			this.stage.on('mousemove', () => {
				this.moveRect.size(CONFIG.getSize(pointStart, this.stage.getPointerPosition()))
				this.moveLayer.draw()
			})
		})

		this.stage.on('mouseup', () => {
			if (!this.moveRect) return
			let rect = this.moveRect.clone()
			let pointStart = rect.position()
			let pointEnd = this.stage.getPointerPosition()
			rect.size(CONFIG.getSize(pointStart, pointEnd))
			this.moveRect.destroy()
			this.moveRect = null
			this.coverLayer.add(rect)
			this.coverLayer.draw()
			this.moveLayer.draw()
			this.stage.off('mousemove')

			// 更新坐标数据
			KonvaMap.output([pointStart, pointEnd])
		})
	}
}

