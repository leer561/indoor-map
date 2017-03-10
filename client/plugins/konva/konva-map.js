import Konva from 'konva'
import * as CONFIG  from './config'
import KonvaMain from './main'

export default class KonvaMap extends KonvaMain {
	constructor() {
		super({
			container: 'konva-stage',
			width: 1406,
			height: 768
		})
		// 添加遮罩图层
		this.certainLayer = new Konva.Layer({opacity: 0.5})

		// 添加临时矩形与绘图层
		this.moveShape = null
		this.moveLayer = new Konva.Layer({opacity: 0.5})

		this.stage.add(this.certainLayer)
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

		// 监听键盘ESC取消绘制
		$(document).on('keydown', e => {
			if (e.keyCode !== 27) return
			// 取消事件绑定
			this.stage.off('mousemove')

			// 注销元素
			if (!this.moveShape) return
			this.moveShape.destroy()
			this.graphicType = this.pointStart = this.moveShape = null
			this.moveLayer.draw()
		})

		// 监听事件绘制图形
		this.imgLayer.on('mousedown', () => {
			if (!this.graphicType) return

			// 根据图形类型开始绘图
			switch (this.graphicType) {
				case 'rect':
					this.pointStart = this.stage.getPointerPosition()
					this.moveShape = new Konva.Rect({
						x: this.pointStart.x,
						y: this.pointStart.y,
						width: 1,
						height: 1,
						fill: 'green',
						stroke: 'black',
						strokeWidth: 1,
						id: new Date().getTime()
					})
					this.moveLayer.add(this.moveShape)
					break
				case 'circular':
					this.pointStart = this.stage.getPointerPosition()
					this.moveShape = new Konva.Circle({
						x: this.pointStart.x,
						y: this.pointStart.y,
						radius: 1,
						fill: 'red',
						stroke: 'black',
						strokeWidth: 1,
						id: new Date().getTime()
					})
					this.moveLayer.add(this.moveShape)
					break
				case 'polygon':
					// 判断是否存在图形，存在就继续绘制
					let currentPoint = this.stage.getPointerPosition()
					if (this.moveShape) {
						let point = this.moveShape.points()
						// 判断是否靠近坐标点
						if (CONFIG.checkClosed(this.pointStart, currentPoint) && point.length > 5) {
							this.moveShape.closed(true)
							vue.outputCover({
								type: this.graphicType,
								coordinate: point,
								name: this.remark,
								id: this.moveShape.id()
							})
							vue.selectType(null)

							let shape = this.moveShape.clone()
							this.moveShape.destroy()
							this.moveLayer.draw()
							// clone后因为id的唯一性，需要重新设置
							shape.id(this.moveShape.id())

							this.certainLayer.add(shape)
							this.certainLayer.draw()
							this.graphicType = this.pointStart = this.moveShape = null

							// 防止条件判断击穿
							return
						} else {
							this.moveShape.points(point.concat(_.values(currentPoint)))
							this.moveLayer.draw()
						}
					} else {
						this.moveShape = new Konva.Line({
							points: _.values(currentPoint),
							fill: '#00D2FF',
							stroke: 'black',
							strokeWidth: 1,
							closed: false,
							id: new Date().getTime()
						})
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
				switch (this.graphicType) {
					case 'rect':
						this.moveShape.size(CONFIG.getSize(this.pointStart, this.stage.getPointerPosition()))
						this.moveLayer.draw()
						break
					case 'circular':
						this.moveShape.radius(CONFIG.getRadius(this.pointStart, this.stage.getPointerPosition()))
						this.moveLayer.draw()
						break
				}
			})
		})

		this.stage.on('mouseup', () => {
			if (!this.moveShape || this.graphicType === 'polygon') return
			// 非多边形绘制
			let shape = this.moveShape.clone()
			let pointEnd = this.stage.getPointerPosition()

			// 根据图形类型处理
			switch (this.graphicType) {
				case 'rect':
					shape.size(CONFIG.getSize(this.pointStart, pointEnd))
					vue.outputCover({
						type: this.graphicType,
						coordinate: [this.pointStart, pointEnd],
						name: this.remark,
						id: this.moveShape.id()
					})
					vue.selectType(null)
					break
				case 'circular':
					shape.radius(CONFIG.getRadius(this.pointStart, pointEnd))
					vue.outputCover({
						type: this.graphicType,
						coordinate: {
							position: this.pointStart,
							radius: shape.radius()
						},
						name: this.remark,
						id: this.moveShape.id()
					})
					vue.selectType(null)
					break
			}
			// 销毁临时图形
			this.moveShape.destroy()
			shape.id(this.moveShape.id())
			this.moveLayer.draw()
			this.stage.off('mousemove')

			// 添加到确定图层
			this.certainLayer.add(shape)
			this.certainLayer.draw()
			this.graphicType = this.pointStart = this.moveShape = null
		})
	}

	// 删除方法
	deleteCover(cover) {
		if (!cover.id) return
		let shapeId = `#${cover.id}`
		let shape = this.certainLayer.findOne(shapeId)
		shape.destroy()
		this.certainLayer.draw()
	}
}

