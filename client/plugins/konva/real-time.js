import Konva from 'konva'
import KonvaMain from './main'
import forEach from 'lodash/fp/forEach'

export default class KonvaRealTime extends KonvaMain {
	constructor() {
		super()
	}

	// 绘制点
	drawPoints(points) {
		if(this.pointLayer){
			this.pointLayer.destroy()
			this.pointLayer = null
			this.pointLayer = new Konva.Layer()
			this.stage.add(this.pointLayer)
		}else{
			this.pointLayer = new Konva.Layer()
			this.stage.add(this.pointLayer)
		}
		forEach(position => {
			this.pointLayer.add(new Konva.Circle({
				x: position.x,
				y: position.y,
				radius: 4,
				fill: '#e65100',
				stroke: '#ffb74d',
				strokeWidth: 1
			}))
		})(points)
		this.pointLayer.draw()
	}
}


