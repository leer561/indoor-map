import Konva from 'konva'
import * as CONFIG  from './config'

export default class KonvaMain {
	constructor(size = CONFIG.SIZE) {
		this.stage = new Konva.Stage(size)

		// 添加遮罩图层
		this.coverLayer = new Konva.Layer({opacity: 0.5})
		this.stage.add(this.coverLayer)

		// 添加背景图层
		this.imgLayer = new Konva.Layer()
		this.stage.add(this.imgLayer)
	}

	addBackGroundImg(img = CONFIG.IMG) {
		// 添加背景图
		let imageObj = new Image()
		imageObj.src = img

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
}

