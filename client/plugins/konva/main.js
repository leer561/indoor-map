import Konva from 'konva'
import * as CONFIG  from './config'
import forEach from 'lodash/forEach'
import * as UTILS from './utils'

export default class KonvaMain {
	constructor(size = CONFIG.SIZE) {
		this.stage = new Konva.Stage(size)

		// 添加背景图层
		this.imgLayer = new Konva.Layer()
		this.stage.add(this.imgLayer)

		// 添加遮罩图层
		this.certainLayer = new Konva.Layer({opacity: 0.7})
		this.stage.add(this.certainLayer)
	}

	addBackGroundImg(img = CONFIG.IMG) {
		// 添加背景图
		let imageObj = new Image()
		imageObj.src = img

		if (this.imgLayer) {
			this.imgLayer.destroy()
			this.imgLayer = null
			this.imgLayer = new Konva.Layer()
			this.stage.add(this.imgLayer)
		}

		imageObj.onload = () => {
			let yoda = new Konva.Image({
				x: 0,
				y: 0,
				image: imageObj,
				width: CONFIG.SIZE.width,
				height: CONFIG.SIZE.height
			})
			this.imgLayer.add(yoda)
			this.imgLayer.moveToBottom()
			this.imgLayer.draw()
		}
	}

	// 删除方法
	deleteCoverByName(cover) {
		if (!cover.name) return
		let shapeName = `.${cover.name}`
		let shape = this.certainLayer.find(shapeName)
		shape.each(e => e.destroy())
		this.certainLayer.draw()
	}

	// 绘制cover
	drawCovers(covers) {
		if (this.certainLayer) {
			this.certainLayer.destroy()
			this.certainLayer = null
			this.certainLayer = new Konva.Layer({opacity: 0.7})
			this.stage.add(this.certainLayer)
		}
		forEach(covers, cover => UTILS.drawCover.call(this, cover))
		this.certainLayer.draw()
	}

	// 显示或者隐藏遮罩层
	showCover(data) {
		this.certainLayer.visible(data)
	}
}

