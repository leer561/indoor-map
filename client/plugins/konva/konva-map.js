import Konva from 'konva'
import * as CONFIG  from './config'
import KonvaMain from './main'
import * as UTILS  from './utils'
import values from 'lodash/values'

export default class KonvaMap extends KonvaMain {
	constructor() {
		super()
		// 添加临时矩形与绘图层
		this.moveShape = null
		this.moveLayer = new Konva.Layer({opacity: 0.5})
		this.stage.add(this.moveLayer)

		// 选择的图形类型
		this.graphicType = this.remark = this.pointStart = null
	}

	// 监听鼠标绘制遮罩
	bindEvents(vue) {
		// 监听事件绘制图形
		this.imgLayer.on('mousedown', () => {
			if (!this.graphicType) return
			// 根据图形类型开始绘图
			if (this.moveShape && this.graphicType === 'polygon') {
				let currentPoint = this.stage.getPointerPosition()
				let point = this.moveShape.points()
				// 判断是否靠近坐标点
				if (UTILS.checkClosed(this.pointStart, currentPoint) && point.length > 5) {
					this.moveShape.closed(true)
					UTILS.output.call(this, vue, point)
					let shape = this.moveShape.clone()
					UTILS.completeDrawing.call(this, shape)
					// 防止条件判断击穿
					return
				} else {
					this.moveShape.points(point.concat(values(currentPoint)))
					this.moveLayer.draw()
				}
			} else {
				// 第一次绘制图形
				UTILS.drawGraphic.call(this)
			}

			// 多边形不需要鼠标悬停
			if (!this.graphicType || this.graphicType === 'polygon') return

			// 鼠标移动
			this.stage.on('mousemove', () => {
				// 根据图形类型开始绘图
				if (this.graphicType === 'rect') {
					this.moveShape.size(UTILS.getSize(this.pointStart, this.stage.getPointerPosition()))
				}
				if (this.graphicType === 'circle') {
					this.moveShape.radius(UTILS.getRadius(this.pointStart, this.stage.getPointerPosition()))
				}
				this.moveLayer.draw()
			})
		})

		// 鼠标抬起
		this.stage.on('mouseup', () => {
			if (!this.moveShape || this.graphicType === 'polygon') return
			// 非多边形绘制
			let shape = this.moveShape.clone()
			let pointEnd = this.stage.getPointerPosition()
			this.stage.off('mousemove')

			// 根据图形类型处理
			switch (this.graphicType) {
				case 'rect':
					shape.size(UTILS.getSize(this.pointStart, pointEnd))
					UTILS.output.call(this, vue, pointEnd)
					break
				case 'circle':
					shape.radius(UTILS.getRadius(this.pointStart, pointEnd))
					UTILS.output.call(this, vue, UTILS.getRadius(this.pointStart, pointEnd))
					break
			}

			// 添加到确定图层
			UTILS.completeDrawing.call(this, shape)
		})

		// 监听键盘ESC取消绘制
		$(document).on('keydown', e => {
			if (e.keyCode !== 27) return
			vue.selectType(null)
			UTILS.cancle.call(this)
		})
	}
}

