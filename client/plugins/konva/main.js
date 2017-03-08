import Konva from 'konva'
import * as CONFIG  from './config'

export default class KonvaMain {
	constructor(size = CONFIG.SIZE) {
		this.stage = new Konva.Stage(size)

		// 添加遮罩图层
		this.coverLayer = new Konva.Layer({opacity: 0.5})
		this.stage.add(this.coverLayer)
	}

	addBackGroundImg(img = CONFIG.IMG) {
		let imgLayer = new Konva.Layer()

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
			imgLayer.add(yoda)
			this.stage.add(imgLayer)
			imgLayer.moveToBottom()
			imgLayer.draw()
		}
	}
}

