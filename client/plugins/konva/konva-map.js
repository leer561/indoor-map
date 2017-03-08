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

		// 指令图层
		this.instructionLayer = new Konva.Layer()
		this.stage.add(this.instructionLayer)

		// 添加指令图形
		CONFIG.addBackColor.call(this)
		CONFIG.addInstrction.call(this)
	}

	// 监听鼠标绘制遮罩
	bindEvents() {
		// 监听事件
		this.imgLayer.on('mousedown', () => {
			console.log('this.graphicType', this.graphicType)
			if (!this.graphicType) return
			let pointStart = this.stage.getPointerPosition()

			// 根据图形类型开始绘图
			switch (this.graphicType) {
				case 'rect':
					this.moveShape = new Konva.Rect({
						x: pointStart.x,
						y: pointStart.y,
						width: 1,
						height: 1,
						fill: 'green',
						stroke: 'black',
						strokeWidth: 1
					})
					this.moveLayer.add(this.moveShape)
					break
				case 'circular':
					this.moveShape = new Konva.Circle({
						x: pointStart.x,
						y: pointStart.y,
						radius: 1,
						fill: 'red',
						stroke: 'black',
						strokeWidth: 1
					})
					this.moveLayer.add(this.moveShape)
					break
			}

			// 鼠标移动
			this.imgLayer.on('mousemove', () => {
				// 根据图形类型开始绘图
				switch (this.graphicType) {
					case 'rect':
						this.moveShape.size(CONFIG.getSize(pointStart, this.stage.getPointerPosition()))
						this.moveLayer.draw()
						break
					case 'circular':
						this.moveShape.radius(CONFIG.getRadius(pointStart, this.stage.getPointerPosition()))
						this.moveLayer.draw()
						break
				}

			})
		})

		this.imgLayer.on('mouseup', () => {
			if (!this.moveShape) return
			let shape = this.moveShape.clone()
			let pointStart = shape.position()
			let pointEnd = this.stage.getPointerPosition()

			// 根据图形类型处理
			switch (this.graphicType) {
				case 'rect':
					shape.size(CONFIG.getSize(pointStart, pointEnd))
					KonvaMap.output({
						type: this.graphicType,
						coordinate: [pointStart, pointEnd],
						name: this.remark
					})
					break
				case 'circular':
					shape.radius(CONFIG.getRadius(pointStart, pointEnd))
					KonvaMap.output({
						type: this.graphicType,
						coordinate: {
							position: pointStart,
							radius: shape.radius()
						},
						name: this.remark
					})
					break
			}

			// 销毁临时图形
			this.moveShape.destroy()
			this.moveShape = null
			this.moveLayer.draw()
			this.imgLayer.off('mousemove')

			// 添加到确定图层
			this.certainLayer.add(shape)
			this.certainLayer.draw()

			// 清空类型
			this.graphicType = null
		})
	}
}

