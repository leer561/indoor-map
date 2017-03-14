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
		fill: '#8fcf00',
		stroke: '#333',
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
		fill: '#ee7c5d',
		stroke: '#333',
		strokeWidth: 1,
		name: String(new Date().getTime())
	})
}

// 生成多边形
export const generateLine = point => {
	return new Konva.Line({
		points: point,
		fill: '#00D2FF',
		stroke: '#333',
		strokeWidth: 1,
		closed: false,
		name: String(new Date().getTime())
	})
}

// 生成文本
export const generateText = function () {
	let text = new Konva.Text({
		x: this.pointStart.x,
		y: this.pointStart.y,
		text: this.remark,
		fontSize: 14,
		fontFamily: 'Calibri',
		fill: 'black',
		name: this.moveShape.name()
	})
	text.moveToTop()
	this.certainLayer.add(text)
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

// 绘图完毕转移图层
export const completeDrawing = function (shape) {
	this.moveShape.destroy()
	this.moveLayer.draw()

	this.certainLayer.add(shape)
	generateText.call(this)
	this.certainLayer.draw()
	this.graphicType = this.pointStart = this.moveShape = null
}

// 取消绘制
export const cancle = function () {
	// 取消事件绑定
	this.stage.off('mousemove')

	// 注销元素
	if (!this.moveShape) return
	this.moveShape.destroy()
	this.graphicType = this.pointStart = this.moveShape = null
	this.moveLayer.draw()
}

// 绘制总入口
export const drawGraphic = function () {
	let currentPoint = this.stage.getPointerPosition()
	this.pointStart = currentPoint
	switch (this.graphicType) {
		case 'rect':
			this.moveShape = generateRect(currentPoint)
			break
		case 'circular':
			this.moveShape = generateCircular(currentPoint)
			break
		case 'polygon':
			this.moveShape = generateLine(_.values(currentPoint))
	}
	this.moveLayer.add(this.moveShape)
}

