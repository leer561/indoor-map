// 矩形需要的长宽
export const getSize = (pointStart, pointEnd) => {
	return {
		width: pointEnd.x - pointStart.x,
		height: pointEnd.y - pointStart.y
	}
}

// 圆形需要的半径
export const getRadius = (pointStart, pointEnd) => {
	let temp = Math.pow((pointEnd.x - pointStart.x), 2) + Math.pow((pointEnd.y - pointStart.y), 2)
	return Math.round(Math.sqrt(temp))
}

// 多边形是否靠近起点的判断
export const checkClosed = (pointStart, pointEnd, consult = 5) => {
	return Math.abs(pointEnd.x - pointStart.x) <= consult || Math.abs(pointEnd.y - pointStart.y) <= consult
}

// 生成矩形
export const generateRect = point => {
	return new Konva.Rect({
		x: point.x,
		y: point.y,
		width: 1,
		height: 1,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 1,
		name: String(new Date().getTime())
	})
}

// 生成圆形
export const generateCircular = point => {
	return new Konva.Circle({
		x: point.x,
		y: point.y,
		radius: 1,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		name: String(new Date().getTime())
	})
}

// 生成矩形
export const generateLine = point => {
	return new Konva.Line({
		points: point,
		fill: '#00D2FF',
		stroke: 'black',
		strokeWidth: 1,
		closed: false,
		name: String(new Date().getTime())
	})
}

// 输出cover
export const output = function (vue, point) {
	vue.selectType(null)
	switch (this.graphicType) {
		case 'rect':
			vue.outputCover({
				type: this.graphicType,
				coordinate: [this.pointStart, point],
				remark: this.remark,
				name: this.moveShape.name()
			})
			break
		case 'circular':
			vue.outputCover({
				type: this.graphicType,
				coordinate: {
					position: this.pointStart,
					radius: point
				},
				remark: this.remark,
				name: this.moveShape.name()
			})
			break
		case 'polygon':
			vue.outputCover({
				type: this.graphicType,
				coordinate: point,
				remark: this.remark,
				name: this.moveShape.name()
			})
			break

	}
}