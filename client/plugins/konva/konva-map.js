import Konva from 'konva'
import * as CONFIG  from './config'
import KonvaMain from './main'
import * as UTILS  from './utils'

export default class KonvaMap extends KonvaMain {
	constructor() {
		super()
		// 添加临时矩形与绘图层
		this.moveShape = null
		this.moveLayer = new Konva.Layer({opacity: 0.5})
		this.stage.add(this.moveLayer)

		// 选择的图形类型
		this.graphicType = null

		// 图形备注
		this.remark = null

		// 图形起始点
		this.pointStart = null
	}

	// 监听鼠标绘制遮罩
	bindEvents(vue) {
		// 监听事件绘制图形
		this.imgLayer.on('mousedown', () => {
			if (!this.graphicType) return

			// 根据图形类型开始绘图
			switch (this.graphicType) {
				case 'rect':
					this.pointStart = this.stage.getPointerPosition()
					this.moveShape = UTILS.generateRect(this.pointStart)
					this.moveLayer.add(this.moveShape)
					break
				case 'circular':
					this.pointStart = this.stage.getPointerPosition()
					this.moveShape = UTILS.generateCircular(this.pointStart)
					this.moveLayer.add(this.moveShape)
					break
				case 'polygon':
					// 判断是否存在图形，存在就继续绘制
					let currentPoint = this.stage.getPointerPosition()
					if (this.moveShape) {
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
							this.moveShape.points(point.concat(_.values(currentPoint)))
							this.moveLayer.draw()
						}
					} else {
						this.moveShape = UTILS.generateLine(_.values(currentPoint))
						this.moveLayer.add(this.moveShape)
						// 多边形多次点击 起点记录需要判断
						this.pointStart = currentPoint
					}

					break
			}

			// 多边形不需要鼠标悬停
			if (!this.graphicType || this.graphicType === 'polygon') return

			// 鼠标移动
			this.stage.on('mousemove', () => {
				// 根据图形类型开始绘图
				if (this.graphicType === 'rect') {
					this.moveShape.size(UTILS.getSize(this.pointStart, this.stage.getPointerPosition()))
				}
				if (this.graphicType === 'circular') {
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
				case 'circular':
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

	// 删除方法
	deleteCover(cover) {
		if (!cover.name) return
		let shapeName = `.${cover.name}`
		let shape = this.certainLayer.find(shapeName)
		shape.each(e => e.destroy())
		this.certainLayer.draw()
	}
}

